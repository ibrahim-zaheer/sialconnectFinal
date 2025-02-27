const express = require("express");
const Review = require("../../models/reviewAndRating/Review");
const User = require("../../models/User"); // Import User model
const Notification = require("../../models/notification/notificationSchema")
const admin = require("../../utils/firebaseAdmin")
// Write a Reviewconst admin = require("../../utils/firebaseAdmin")

// const submitReviewAndNotify = async (req, res) => {
//     try {
//       const { supplierId, productName, rating, reviewText } = req.body;
  
//       // Validate required fields
//       if ( !supplierId || !productName || !rating || !reviewText) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       // Step 1: Save the review
//       const review = new Review({
//         user: req.user._id, // Get user ID from authentication middleware
//         supplier: supplierId, // Reference supplier by ObjectId
//         productName,
//         rating: Number(rating),
//         reviewText,
//       });
  
//       await review.save();
  
//       // Step 2: Find the FCM token of the supplier (User B)
//       const supplier = await User.findById(supplierId);
//       if (!supplier || !supplier.fcmToken) {
//         return res.status(404).json({ message: "Supplier not found or FCM token not available" });
//       }
  
//       // Step 3: Create a notification for the supplier
//       const notification = new Notification({
//         userId: supplierId,
//         message: `User A has reviewed your product: ${reviewText}`,
//       });
//       await notification.save();
  
//       // Step 4: Send the notification to the supplier
//       const message = {
//         notification: {
//           title: "New Product Review",
//           body: `User A has reviewed your product: ${reviewText}`,
//         },
//         token: supplier.fcmToken, // Send the notification to the supplier's FCM token
//       };
  
//       await admin.messaging().send(message);
  
//       // Respond with success
//       res.status(200).json({ message: "Review submitted and notification sent successfully" });
//     } catch (error) {
//       console.error("Error submitting review or sending notification:", error); // Log the error
//       res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
//     }
//   };
  

const submitReviewAndNotify = async (req, res) => {
    try {
      const { supplierId, productName, rating, reviewText } = req.body;
  
      // Validate required fields
      if (!supplierId || !productName || !rating || !reviewText) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Step 1: Save the review
      const review = new Review({
        user: req.user._id, // Get user ID from authentication middleware
        supplier: supplierId, // Reference supplier by ObjectId
        productName,
        rating: Number(rating),
        reviewText,
      });
  
      await review.save(); // Save the review even if FCM token is not available
  
      // Step 2: Find the FCM token of the supplier (User B)
      const supplier = await User.findById(supplierId);
  
      // Step 3: If the supplier exists but doesn't have an FCM token, skip the notification
      if (supplier && supplier.fcmToken) {
        // If supplier has FCM token, create a notification and send it
        const notification = new Notification({
          userId: supplierId,
          message: `User A has reviewed your product: ${reviewText}`,
        });
  
        await notification.save();
  
        const message = {
          notification: {
            title: "New Product Review",
            body: `User A has reviewed your product: ${reviewText}`,
          },
          token: supplier.fcmToken, // Send the notification to the supplier's FCM token
        };
  
        await admin.messaging().send(message); // Send the notification to FCM
      }
  
      // Respond with success, even if notification is skipped
      res.status(200).json({ message: "Review submitted successfully" });
    } catch (error) {
      console.error("Error submitting review or sending notification:", error);
      res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
    }
  };
  

const WriteReview = async (req, res) => {
    try {
        const { supplierId, productName, rating, reviewText } = req.body;

        // Validate required fields
        if (!supplierId || !productName || !rating || !reviewText) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate if supplier exists and has the correct role
        const supplier = await User.findOne({ _id: supplierId, role: "supplier" });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found or invalid role" });
        }

        // Create a new review
        const newReview = new Review({
            user: req.user._id, // Get user ID from authentication middleware
            supplier: supplierId, // Reference supplier by ObjectId
            productName,
            rating: Number(rating),
            reviewText,
        });

        // Save review to database
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user", "name email profilePicture") // Populate reviewer details
            .populate("supplier", "name email profilePicture"); // Populate supplier details

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Reviews by Supplier
const getReviewsBySupplier = async (req, res) => {
    try {
        const { supplierId } = req.params;

        // Validate supplierId
        if (!supplierId) {
            return res.status(400).json({ message: "Supplier ID is required" });
        }

        // Check if supplier exists
        const supplier = await User.findOne({ _id: supplierId, role: "supplier" });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        const reviews = await Review.find({ supplier: supplierId })
            .populate("user", "name email profilePicture"); // Populate reviewer details

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this supplier" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Export the functions for routes
module.exports =  { WriteReview, getAllReviews, getReviewsBySupplier, submitReviewAndNotify };
