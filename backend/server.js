const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

const ChatMessage = require("./models/ChatMessage");
const authRoutes = require("./routes/auth");
const supplierRoutes = require("./routes/supplier/supplierRoutes");
const messagesRoutes = require("./routes/messages");

const messageRoutes = require("./routes/message.routes")

const auctionRoutes = require("./routes/bidding/auctionItemRoutes")

const { Server } = require("socket.io");

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default dev server URL
    //methods: ["GET", "POST"],
    //credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));


 // used to store online users
const userSocketMap = {}; // {userId: socketId} 


// Function to get the socket ID of a specific user
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}


// Socket.IO Logic
io.on("connect", (socket) => {
  console.log(`User is connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on("joinRoom", ({ sender, receiver }) => {
  //   const roomId = [sender, receiver].sort().join("-");
  //   socket.join(roomId);
  //   console.log(`${sender} joined room: ${roomId}`);
  // });

  io.on("sendMessage", async ({ sender, receiver, message }) => {
    const receiverSocketId = getReceiverSocketId(receiver);

  const chatMessage = new ChatMessage({ sender, receiver, message });
  await chatMessage.save(); // Save the message in the database

  // Emit the message to the sender
  io.emit("receiveMessage", chatMessage);

  // Emit the message to the receiver if they are online
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receiveMessage", chatMessage);
  }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Routes
app.get("/", (req, res) => res.send("Server is running..."));
app.use("/api/auth", authRoutes);
app.use("/supplier", supplierRoutes);
//app.use("/messages", messagesRoutes);

//this is one real and we are working to improve it
app.use("/message",messageRoutes);

app.use("/bidding",auctionRoutes);

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









// // backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const http = require("http");
// const dotenv = require('dotenv');
// const cors = require("cors");

// const authRoutes = require('./routes/auth');

// const supplierRoutes = require('./routes/supplier/supplierRoutes')

// const messages = require('./routes/messages')

// const {Server} = require('socket.io');

// // Initialize dotenv to access environment variables
// dotenv.config();
// require('dotenv').config(); 

// const app = express();
// const PORT = process.env.PORT || 5000;
// // Middleware
// app.use(cors());


// // MongoDB connection using Mongoose
// mongoose.connect(process.env.MONGO_URI, {
  
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch((error) => console.error("Could not connect to MongoDB:", error));




// // for coket io set up

// const server = http.createServer(app);


// const io = new Server(server, {
//   cors: {
//       origin: "*", // Allow frontend to connect from any origin
//   },
// });

// // Middleware to parse JSON
// app.use(express.json());



// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Join a specific room for 1-to-1 chat
//   socket.on("joinRoom", ({ sender, receiver }) => {
//       const roomId = [sender, receiver].sort().join("-");
//       socket.join(roomId);
//       console.log(`${sender} joined room: ${roomId}`);
//   });

//   // Handle sending a message
//   socket.on("sendMessage", async ({ sender, receiver, message }) => {
//       const roomId = [sender, receiver].sort().join("-");
      
//       // Save message to the database
//       const chatMessage = new ChatMessage({ sender, receiver, message });
//       await chatMessage.save();

//       // Broadcast the message to the room
//       io.to(roomId).emit("receiveMessage", chatMessage);
//   });

//   socket.on("disconnect", () => {
//       console.log("A user disconnected:", socket.id);
//   });
// });




// // Basic route for testing
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.use("/api/auth", authRoutes);

// app.use("/supplier",supplierRoutes);

// app.use("/messages",messages);