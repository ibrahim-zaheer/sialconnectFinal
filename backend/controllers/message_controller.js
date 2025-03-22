// import User from "../models/user.js";

const User = require("../models/user");
// import Message from "../models/message.model";

const Message = require("../models/message.model");


// import { getReceiverSocketId, io } from "../utils/socket";


let io;
let userSocketMap;
let getReceiverSocketId; // Add this

function initSocket(ioInstance, socketMap, socketIdGetter) {
  io = ioInstance;
  userSocketMap = socketMap;
  getReceiverSocketId = socketIdGetter; // Store the function
}

 const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
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
      const { text } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
       
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

  module.exports = { initSocket,getUsersForSidebar, getMessages, sendMessage };