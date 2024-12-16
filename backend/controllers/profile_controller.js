// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { uploadProfilePicture } = require("../config/multerConfig");
const express = require('express');

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
