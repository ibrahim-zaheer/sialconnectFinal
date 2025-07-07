// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const dotenv = require("dotenv");
// const cors = require("cors");

// const ChatMessage = require("./models/ChatMessage");
// const authRoutes = require("./routes/auth");
// const supplierRoutes = require("./routes/supplier/supplierRoutes");
// const messagesRoutes = require("./routes/messages");

// const messageRoutes = require("./routes/message.routes")

// const auctionRoutes = require("./routes/bidding/auctionItemRoutes")

// const { Server } = require("socket.io");
// const path = require("path");




// // Initialize dotenv to access environment variables
// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Vite default dev server URL
//     //methods: ["GET", "POST"],
//     //credentials: true,
//   },
// });

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());



// // Serve static files from React's build directory
// // app.use(express.static(path.join(__dirname, "../frontend"))); // Adjust path to match folder structure

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
// }





// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {  })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.error("MongoDB connection error:", error));


//  // used to store online users
// const userSocketMap = {}; // {userId: socketId} 


// // Function to get the socket ID of a specific user
// function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }


// // Socket.IO Logic
// io.on("connect", (socket) => {
//   console.log(`User is connected: ${socket.id}`);

//   const userId = socket.handshake.query.userId;
//   if (userId) userSocketMap[userId] = socket.id;

  
//   // io.emit() is used to send events to all the connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // socket.on("joinRoom", ({ sender, receiver }) => {
//   //   const roomId = [sender, receiver].sort().join("-");
//   //   socket.join(roomId);
//   //   console.log(`${sender} joined room: ${roomId}`);
//   // });

//   io.on("sendMessage", async ({ sender, receiver, message }) => {
//     const receiverSocketId = getReceiverSocketId(receiver);

//   const chatMessage = new ChatMessage({ sender, receiver, message });
//   await chatMessage.save(); // Save the message in the database

//   // Emit the message to the sender
//   io.emit("receiveMessage", chatMessage);

//   // Emit the message to the receiver if they are online
//   if (receiverSocketId) {
//     io.to(receiverSocketId).emit("receiveMessage", chatMessage);
//   }
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// // Routes
// app.get("/", (req, res) => res.send("Server is running..."));
// app.use("/api/auth", authRoutes);
// app.use("/supplier", supplierRoutes);
// //app.use("/messages", messagesRoutes);

// //this is one real and we are working to improve it
// app.use("/message",messageRoutes);

// app.use("/bidding",auctionRoutes);

// app.use("/api/bidding",auctionRoutes);

// // // Redirect all other requests to React's index.html (except API routes)
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../frontend/", "index.html")); // Adjust path to match folder structure
// //   //  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
// // });


// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../frontend/dist")));

// //   app.get("*", (req, res) => {
// //     if (!req.originalUrl.startsWith("/api") && !req.originalUrl.startsWith("/socket.io")) {
// //       res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
// //     } else {
// //       res.status(404).json({ error: "API route not found" });
// //     }
// //   });
// // }

// // Ensure React serves non-API routes
// if (process.env.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     if (

//     ) {
//       res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
//     } else {
//       res.status(404).json({ error: "API route not found" });
//     }
//   });
// }


// // // ✅ Ensure React Handles All Frontend Routes
// // app.get("*", (req, res) => {
// //   // Serve index.html for non-API requests
// //   if (!req.originalUrl.startsWith("/api") && !req.originalUrl.startsWith("/socket.io")) {
// //     res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
// //   } else {
// //     res.status(404).json({ error: "API route not found" });
// //   }
// // });

// // Start Server
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });













//8th Feburary Chatgpt updated code for the problem:Lets do it
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// const ChatMessage = require("./models/ChatMessage");
const Message = require("./models/message.model");
const authRoutes = require("./routes/auth");
const supplierRoutes = require("./routes/supplier/supplierRoutes");
const exporterRoutes = require("./routes/exporter/exporterRoutes")

const messageRoutes = require("./routes/messageRoutes");
const auctionRoutes = require("./routes/bidding/auctionItemRoutes");

const reviewRoutes = require("./routes/review/reviewRoutes")

const adminVerificationRoutes = require("./routes/adminVerification/adminVerificationRoute");
// const notificationRoutes = require("./routes/notification/notification");
// Import notification router and socketIO setter
const notificationRoutes = require("./routes/notification/notification");
const { router: notificationRouter, setSocketIO } = notificationRoutes;
const favouriteRoutes = require("./routes/favourites/favouriteRoutes");

const offerRoutes = require("./routes/offer/offerRoutes");

const orderRoutes = require("./routes/order/orderRoutes");

const messageController =  require("./controllers/message_controller");

const reviewController =  require("./controllers/reviews/review_controllers");
const orderController =  require("./controllers/order/order_controller");



const adminRoutes = require("./routes/admin/adminRoutes");

const complaintRoutes = require("./routes/complaint/complaintRoutes");

const { setUserSocketMapping } = require("./utils/socketHelper");



const { Server } = require("socket.io");

const fs = require("fs");
// Initialize dotenv to access environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    //origin: "http://localhost:5173", // Vite default dev server URL
    // origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:5175","https://sialconnect-final-dw1o86zbb-ibrahim-zaheers-projects.vercel.app/"],
    origin: ["*"],

  },
  methods: ["GET", "POST"]
});

module.exports = io; 

const PORT = process.env.PORT || 5000;



// Middleware
app.use(cors());
app.use(express.json());
// ✅ Socket.IO Logic
const userSocketMap = {}; // { userId: socketId }


// Inject io and userSocketMap into notification router for real-time emitting
setSocketIO(io, userSocketMap);
// ✅ Prefix all API routes with `/api` to avoid conflicts with frontend routes
app.use("/api/auth", authRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/exporter", exporterRoutes);


app.use("/api/message", messageRoutes);
app.use("/api/bidding", auctionRoutes);

app.use("/api/reviews", reviewRoutes);

// app.use("/api/notification",notificationRoutes);
app.use("/api/notification", notificationRouter);




app.use("/api/favourites",favouriteRoutes);

app.use("/api/offers",offerRoutes);

app.use("/api/order",orderRoutes);

app.use("/api/adminVerification",adminVerificationRoutes);

app.use("/api/complaint",complaintRoutes);


app.use("/api/admin",adminRoutes);





// ✅ Serve static frontend files (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));



function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}
// Modify the socket controller initialization
messageController.initSocket(io, userSocketMap, getReceiverSocketId);

reviewController.initSocket(io, userSocketMap, getReceiverSocketId);
orderController.initSocket(io, userSocketMap, getReceiverSocketId);


io.on("connect", (socket) => {
  console.log(`User is connected: ${socket.id}`);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //21st june 2025
  if (userId) {
    setUserSocketMapping(userId, socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Simulating a new notification every 5 seconds for testing
  // setInterval(() => {
  //   const randomNotification = {
  //     message: `Random notification at ${new Date().toLocaleTimeString()}`,
  //     actionUrl: `/some-action-url/${Math.floor(Math.random() * 1000)}`, // Generate random action URL
  //   };

  //   // Emitting the new_notification event to the client
  //   socket.emit("new_notification", randomNotification);
  //   console.log("Emitting new_notification:", randomNotification);
  // }, 5000); // Emit every 5 seconds

  // socket.on("new_notification", (notification) => {
  //   console.log("New notification event received:", notification);
  //   const receiverSocketId = getReceiverSocketId(notification.userId); // Get receiver's socketId
  //   if (receiverSocketId) {
  //     io.to(receiverSocketId).emit("newNotification", notification); // Emit notification to user
  //     console.log(notification);
  //   }
  // });


  // socket.on("sendMessage", async ({ sender, receiver, message }) => {
  //   const receiverSocketId = getReceiverSocketId(receiver);
  
  //   const chatMessage = new ChatMessage({ sender, receiver, message });
  //   await chatMessage.save();
  
  //   if (receiverSocketId) {
  //     io.to(receiverSocketId).emit("newMessage", chatMessage);
  //   }
  
  //   // Optionally send to sender too
  //   const senderSocketId = getReceiverSocketId(sender);
  //   if (senderSocketId) {
  //     io.to(senderSocketId).emit("newMessage", chatMessage);
  //   }
  // });

  // messageController.initSocket(io, userSocketMap);

    socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined the room.`);
  });
  socket.on("sendMessage", async ({ sender, receiver, text }) => {
    try {
      const newMessage = new Message({
        senderId: sender,
        receiverId: receiver,
        text,
      });
  
      await newMessage.save();
  
      const receiverSocketId = getReceiverSocketId(receiver);
  
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      // Optionally: also emit to sender for confirmation
      const senderSocketId = getReceiverSocketId(sender);
      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", newMessage);
      }
    } catch (error) {
      console.error("Socket message error:", error);
    }
  });
  
  

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
 
});

// ✅ API Health Check Route
app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

// ✅ Catch-all: Serve React app for non-API routes
app.get("*", (req, res) => {
  if (!req.originalUrl.startsWith("/api") && !req.originalUrl.startsWith("/socket.io")) {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  } else {
    res.status(404).json({ error: "API route not founds" });
  }
});

// require("./cron");
// ✅ Start Server
server.listen(PORT, () => {
  console.log(`Server running on ports ${PORT}`);
});







