// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { uploadProfilePicture } = require("../config/multerConfig");
const express = require('express');

const {updateProfileSchema} = require("../validators/userValidator")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.profilePicture = async (req, res) => {
  try {
    const { file } = req; // File metadata from Multer
    console.log(file); // Log file details for debugging
    const userId = req.user.id; // Assuming authentication middleware sets req.user
    

    // Update the user's profilePicture field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: file.path },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ message: 'Error updating profile picture', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = updateProfileSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const { id } = req.user; // Assuming authMiddleware attaches the user ID
    const {
      city,
      cnic,
      phoneNumber,
      businessName,
      businessAddress,
      postalCode,
      bio,
      dateOfBirth,
    } = value; // Use the validated data

    // Check for duplicate CNIC
    if (cnic) {
      const existingUserWithCNIC = await User.findOne({ cnic });
      if (existingUserWithCNIC && existingUserWithCNIC._id.toString() !== id) {
        return res.status(400).json({ message: "CNIC already in use" });
      }
    }

    // Check for duplicate phone number
    // if (phoneNumber) {
    //   const existingUserWithPhone = await User.findOne({ phoneNumber });
    //   if (existingUserWithPhone && existingUserWithPhone._id.toString() !== id) {
    //     return res.status(400).json({ message: "Phone number already in use" });
    //   }
    // }

    // Update only the specified fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { city, cnic, phoneNumber, businessName, businessAddress, postalCode, bio, dateOfBirth },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error: CNIC or phone number already in use" });
    }

    res.status(500).json({ message: error.message });
  }
};

// exports.upgradeUserToPro = async (req, res) => {
//   try {
//  // Use user id from auth middleware, not client
//     const userId = req.user?.id;
//     const { paymentIntentId } = req.body;

//     if (!userId) return res.status(401).json({ message: "Unauthorized" });
//     if (!paymentIntentId) return res.status(400).json({ message: "paymentIntentId is required" });

//     // Retrieve payment intent from Stripe to verify status
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (!paymentIntent) {
//       return res.status(404).json({ message: "PaymentIntent not found." });
//     }

//     // Check if payment succeeded
//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ message: "Payment not successful yet." });
//     }

//     // Update the user's subscription to Pro
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     user.subscription.plan = "pro";
//     user.subscription.paymentProviderId = paymentIntentId;

//     // Set expiryDate 30 days from now
//     user.subscription.expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

//     await user.save();

//     res.status(200).json({ message: "Subscription upgraded to Pro successfully." });
//   } catch (error) {
//     console.error("Error upgrading subscription:", error);
//     console.log("error is "+error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };


exports.upgradeUserToPro = async (req, res) => {
  try {
    console.log("Received body:", req.body); // log input

    // Use user id from auth middleware, not client
    const userId = req.user?.id;
    const { paymentIntentId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!paymentIntentId) return res.status(400).json({ message: "paymentIntentId is required" });

    // Retrieve payment intent from Stripe to verify status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(404).json({ message: "PaymentIntent not found." });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not successful yet." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.subscription.plan = "pro";
    user.subscription.paymentProviderId = paymentIntentId;
    user.subscription.expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.save();
        console.log("Received body:", req.body);

    res.status(200).json({ message: "Subscription upgraded to Pro successfully." });
  } catch (error) {
    console.error("Error upgrading subscription:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



exports.createPaymentIntent = async (req, res) => {
  try {
    const { plan } = req.body;
    // You can adjust amount based on plan here
    let amount;
    if (plan === "pro") {
      amount = 2900; // e.g. $29.00 in cents
    } else {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // Optionally, attach userId or other metadata to the PaymentIntent for later use (webhooks, etc)
    const metadata = {};
    if (req.user && req.user.id) {
      metadata.userId = req.user.id; 
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata,
      description: `Subscription payment for ${plan} plan`,
      // You can add payment_method_types, receipt_email, etc here if needed
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      
    });
    console.log("payment intent created successfully");
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};