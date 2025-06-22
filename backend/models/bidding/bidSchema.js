const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  amount: Number,
  bidder: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    profilePicture: String,
  },
  auctionItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  
);

module.exports = mongoose.model("Bid", bidSchema);