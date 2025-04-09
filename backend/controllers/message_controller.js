// import User from "../models/user.js";

const User = require("../models/user");
// import Message from "../models/message.model";

const Message = require("../models/message.model");


// import { getReceiverSocketId, io } from "../utils/socket";

const express = require("express");

const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region:  process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET_NAME;


let io;
let userSocketMap;
let getReceiverSocketId; // Add this

function initSocket(ioInstance, socketMap, socketIdGetter) {
  io = ioInstance;
  userSocketMap = socketMap;
  getReceiverSocketId = socketIdGetter; // Store the function
}

//  const getUsersForSidebar = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;
//     const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

//     res.status(200).json(filteredUsers);
//   } catch (error) {
//     console.error("Error in getUsersForSidebar: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


const sendingVoiceMessage = async(req,res)=>{
    const file = req.file;
    const fileName = `voiceMessages/${uuidv4()}.mp3`;
  
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read', // or use pre-signed URLs if private
    };
  
    try {
      const result = await s3.upload(params).promise();
      res.json({ url: result.Location }); // Return S3 URL
    } catch (err) {
      console.error('S3 Upload Error:', err);
      res.status(500).json({ error: 'Upload failed' });
    }
}

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Step 1: Find distinct user IDs who have chatted with logged-in user
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    }).select("senderId receiverId");

    const userIdsSet = new Set();

    messages.forEach(msg => {
      if (msg.senderId.toString() !== loggedInUserId.toString()) {
        userIdsSet.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== loggedInUserId.toString()) {
        userIdsSet.add(msg.receiverId.toString());
      }
    });

    const chatUserIds = Array.from(userIdsSet);

    // Step 2: Get their full user data (excluding passwords)
    const users = await User.find({ _id: { $in: chatUserIds } }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

 const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

 const sendMessage = async (req, res) => {
    try {
      const { text, voiceMessage, duration } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      
          // Validate that at least one message type exists
    if (!text && !voiceMessage) {
      return res.status(400).json({ error: "Message content is required" });
    }

    // Validate voice message duration if voice message exists
    if (voiceMessage && (!duration || typeof duration !== 'number')) {
      return res.status(400).json({ error: "Duration is required for voice messages" });
    }
  
      // const newMessage = new Message({
      //   senderId,
      //   receiverId,
      //   text,
       
      // });
         // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || null,
      voiceMessage: voiceMessage || null,
      duration: voiceMessage ? duration : null
    });
  
      await newMessage.save();
      const receiverSocketId = getReceiverSocketId(receiverId); // Now works!
    
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
          // Match frontend field names
          _id: newMessage._id,
          sender: newMessage.senderId, // Convert to sender
          receiver: newMessage.receiverId, // Convert to receiver
          text: newMessage.text,
          voiceMessage: newMessage.voiceMessage,
        duration: newMessage.duration,
          createdAt: newMessage.createdAt
        });
      }
      console.log("message is sent");
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports = { initSocket,getUsersForSidebar, getMessages, sendMessage, sendingVoiceMessage };