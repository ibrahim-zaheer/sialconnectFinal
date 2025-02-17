const express = require("express");

const User = require("../../models/User"); // Import User model




// Get All Reviews
const getToken = async (req, res) => {
    try {
        const { userId, fcmToken } = req.body;
        await User.findByIdAndUpdate(userId, { fcmToken });

        res.status(200).json({ message: "FCM Token saved" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save token" });
    }
};



// Export the functions for routes
module.exports =  {  getToken };
