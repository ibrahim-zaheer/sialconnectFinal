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
      message:{type:String},
    },
    counterOfferCount: { type: Number, default: 0 },
    updateCount: { type: Number, default: 0 },

    isUpdated: { type: Boolean, default: false },
    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Tracks who accepted the offer
    createdAt: { type: Date, default: Date.now },
    history: [
      {
        price: Number,
        quantity: Number,
        message: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date, default: Date.now },
      }
    ],
     remindersSent: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
    },
    // lastReminderSentAt: Date,
    // nextReminderAt: Date,
     nextReminderAt: {
    type: Date,
    default: null
  },
  lastReminderSentAt: {
    type: Date,
    default: null
  },
    reminderActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
    
  
);

module.exports = mongoose.model("Offer", OfferSchema);
