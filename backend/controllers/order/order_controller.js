const Order = require("../../models/offer/orderSchema");

// ✅ Get all orders for the logged-in supplier
const getOrdersBySupplier = async (req, res) => {
    try {
      const supplierId = req.user.id;
  
      const orders = await Order.find({ supplierId })
        .populate("exporterId", "name email")   // Optional: populate exporter info
        .populate("productId", "name")          // Optional: populate product info
        .populate("auctionId", "title")
        .sort({ createdAt: -1 });               // Optional: latest orders first
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this supplier." });
      }
  
      res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving orders", error });
    }
  };

  // ✅ Get all orders placed by a specific exporter via URL param
const getOrdersByExporter = async (req, res) => {
  try {
    const exporterId = req.user.id;

    const orders = await Order.find({ exporterId })
      .populate("supplierId", "name email")    // Optional: show supplier info
      .populate("productId", "name") 
      .populate("auctionId", "title")          // Optional: show product info
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this exporter." });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};


module.exports = {
    getOrdersBySupplier,getOrdersByExporter
};