const express = require("express");

const User = require("../../models/User"); // Import User model
const Product = require("../../models/Product");
const Order = require("../../models/offer/orderSchema");

// Only return users who are NOT admin
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });
  res.json(users);
};

// const getAllProducts = async (req, res) => {
//   const product = await Product.find();
//   res.json(product);
// };


const suspendUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot suspend an admin user" });
    }

    user.status = "suspended";
    await user.save();

    res.status(200).json({ message: "User suspended successfully", user });
  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const reactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status === "active") {
      return res.status(400).json({ message: "User is already active" });
    }

    user.status = "active";
    await user.save();

    res.status(200).json({ message: "User reactivated successfully", user });
  } catch (error) {
    console.error("Error reactivating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const toggleUserStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot change status of an admin user" });
    }

    // Toggle the status
    user.status = user.status === "active" ? "suspended" : "active";
    await user.save();

    res.status(200).json({
      message: `User status changed to '${user.status}' successfully`,
      user,
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductsBySupplierId = async (req, res) => {
  try {
      const supplierId = req.params.supplierId;

      const products = await Product.find({ supplier: supplierId });

      if (products.length === 0) {
          return res.status(404).json({ message: "No products found for this supplier." });
      }

      res.status(200).json({ products });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

  // ✅ Get all orders placed by a specific exporter via URL param
const getOrdersByExporterId = async (req, res) => {
  try {
    const exporterId = req.params.exporterId;

    const orders = await Order.find({ exporterId })
      .populate("supplierId", "name email")    // Optional: show supplier info
      .populate("productId", "name")           // Optional: show product info
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this exporter." });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};
  // Export the functions for routes
  module.exports =  { getAllUsers,suspendUser,reactivateUser,toggleUserStatus, getProductsBySupplierId, getOrdersByExporterId };