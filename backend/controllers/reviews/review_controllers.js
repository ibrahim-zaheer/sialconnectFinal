const express = require("express");
const Review = require("../../models/reviewAndRating/Review");
const User = require("../../models/User"); // Import User model


// Write a Review
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
module.exports =  { WriteReview, getAllReviews, getReviewsBySupplier };
