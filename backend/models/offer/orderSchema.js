const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", required: false },
  auctionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Auction", 
    required: false 
  },
  exporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  message: { type: String, maxlength: 500 },
  status: { type: String, enum: ["processing", "shipped", "delivered"], default: "processing" },
  sampleStatus: {
    type: String,
    enum: ["waiting_for_payment", "waiting_for_sample", "sample_received", "sample_accepted", "sample_rejected"],
    default: "waiting_for_payment"
  },
  paymentIntentId: { type: String },  // Stores the Stripe payment intent ID
  paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },  // Payment status
  sampleStatus: { type: String, enum: ["not_sent", "sent", "received"], default: "not_sent" },  // Sample status
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
