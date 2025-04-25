// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { uploadProfilePicture } = require("../config/multerConfig");
const express = require('express');

const {updateProfileSchema} = require("../validators/userValidator")

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