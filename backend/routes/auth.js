// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controllers");
const profileController = require("../controllers/profile_controller")
const {uploadProfilePicture}= require('../config/multerConfig');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const User = require("../models/user");

const authMiddleware = require("../middleware/authMiddleware");

// Register Route
router.post("/register", authController.registerUser);

// Login Route
router.post("/login", authController.loginUser);

// Google Sign-In Route
router.post("/google", authController.googleSignIn);

router.post("/select-role",authController.selectRole);


// for profile picture upload
router.put("/profile-picture", authMiddleware,uploadProfilePicture.single('image'),profileController.profilePicture);


router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
  
    try {
      // Save OTP and expiration to the database
      await User.updateOne(
        { email },
        { otp, otpExpires: Date.now() + 10 * 60 * 1000 }, // OTP valid for 10 minutes
        { upsert: true }
      );
  
      // Send OTP email
      await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  
  router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.error("User not found:", email);
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.otp !== otp || Date.now() > user.otpExpires) {
        console.error("Invalid or expired OTP:", { otp, otpExpires: user.otpExpires });
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
  
      // OTP is valid; clear it from the database
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error in /verify-otp route:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  





module.exports = router;
