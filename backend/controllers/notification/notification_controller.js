const express = require("express");

const User = require("../../models/User"); // Import User model

const Notification = require("../../models/notification/notificationSchema")

const admin = require("../../utils/firebaseAdmin")

const NotificationService = require("../../services/NotificationService")

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


async function sendLikeNotification(req, res) {
    const { userAId, userBId, photoId } = req.body; // Extract userA's id, userB's id, and the photo ID
  
    try {
      // Get the FCM token for User B
      const userB = await User.findById(userBId);
      if (!userB || !userB.fcmToken) {
        return res.status(404).send('User B or User B’s FCM token not found');
      }
  
      // Create a notification in the database (optional)
      const notification = new Notification({
        userId: userBId,
        message: `User A liked your photo!`,
      });
      await notification.save();
  
      // Send the push notification to User B
      const message = {
        notification: {
          title: 'New Like',
          body: `User A liked your photo!`,
        },
        token: userB.fcmToken, // User B's FCM token
      };
  
      await admin.messaging().send(message);
  
      res.status(200).send('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification');
    }
  }
  

  const sendFirebaseNotification = async(req,res)=>{
    try{
       const {title,body, deviceToken} = req.body;
       await NotificationService.sendNotification(deviceToken,title,body);
       res.status(200).json({message:"Notification Sent Successfully",success: true});
    }
    catch(error){
        res.status(500).json({message:"Notification Failed",success: false})
    }
  }


// Export the functions for routes
module.exports =  {  getToken , sendLikeNotification,sendFirebaseNotification};
