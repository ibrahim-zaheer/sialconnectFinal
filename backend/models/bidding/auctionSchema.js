













const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  category: String,

  currentBid: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  startTime: String,
  endTime: String,
  // image: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  image: {
    type: [String],
    default: [
      "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg",
    ],
  },
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bids: [
    {
      userId: {  // This should reference User, not Bid
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Change reference to "User"
        required: true
      },
      userName: String,
      profileImage: String,
      amount: Number,
      bidId: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" } 
    },
  ],
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commissionCalculated: {
    type: Boolean,
    default: false,
  },
  acceptedBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
    default: null,
  },

  isClosed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = { Auction };
