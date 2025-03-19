const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    exporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    message: {
        type: String,
        required: false,
        maxlength: 500,
      },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "counter"],
      default: "pending",
    },
    counterOffer: {
      price: { type: Number },
      quantity: { type: Number },
    },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Tracks who accepted the offer
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model("Offer", OfferSchema);
