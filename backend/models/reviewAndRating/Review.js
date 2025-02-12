const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you're using a User model
      required: true,
    },
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Can be any other entity like services, etc.
      required: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


export const Review = mongoose.model("Review", reviewSchema);