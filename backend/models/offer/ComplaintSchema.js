const mongoose = require("mongoose");

// Complaint Schema
const ComplaintSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // Reference to the Order schema
    required: true,  // Ensure that the complaint is linked to an order
  },
  topic: {
    type: String,
    enum: [
      "Money",       // Complaint related to payment or pricing issues
      "Delay",       // Complaint related to order delay
      "Quality",     // Complaint related to product quality
      "Customer Service",  // Complaint regarding customer service
      "Other"        // For any other complaints
    ],
    required: true, // The topic must be specified
  },
  message: {
    type: String,
    required: true, // Complaint message must be provided
    maxlength: 1000, // Optional: Limit the length of the complaint message
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation time of the complaint
  },
  resolved: {
    type: Boolean,
    default: false,  // Track whether the complaint has been resolved or not
  },
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
