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
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
