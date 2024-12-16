// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');

const supplierRoutes = require('./routes/supplier/supplierRoutes')

// Initialize dotenv to access environment variables
dotenv.config();
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB:", error));

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