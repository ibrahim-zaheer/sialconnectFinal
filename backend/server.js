// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const dotenv = require('dotenv');
const cors = require("cors");

const authRoutes = require('./routes/auth');

const supplierRoutes = require('./routes/supplier/supplierRoutes')

const messages = require('./routes/messages')

const {Server} = require('socket.io');

// Initialize dotenv to access environment variables
dotenv.config();
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB:", error));




// for coket io set up

const server = http.createServer(app);



// Chat Gpt Garbage code can be avoided
// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173/", // Replace with your frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// let onlineUsers = new Map();

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   // Handle user joining
//   socket.on("join", (userId) => {
//     onlineUsers.set(userId, socket.id);
//     console.log(`${userId} is online.`);
//   });

//   // Handle sending messages
//   socket.on("send_message", ({ senderId, receiverId, message }) => {
//     const receiverSocketId = onlineUsers.get(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receive_message", {
//         senderId,
//         message,
//       });
//     }
//   });

//   // Handle user disconnect
//   socket.on("disconnect", () => {
//     for (let [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         onlineUsers.delete(userId);
//         console.log(`${userId} disconnected.`);
//         break;
//       }
//     }
//   });
// });







// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);

app.use("/supplier",supplierRoutes);

app.use("/messages",messages);