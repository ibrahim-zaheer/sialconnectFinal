// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // The user who writes the review
//       required: true,
//     },
//     supplier: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // The supplier being reviewed
//       required: true,
//     },
//     productName: {
//       type: String,
//       required: true,
//       maxlength: 500,
//     },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//       required: true,
//       default: 1,
//     },
//     reviewText: {
//       type: String,
//       required: true,
//       maxlength: 500,
//     },
//   },
//   { timestamps: true }
// );

// const Review = mongoose.model("Review", reviewSchema);

// module.exports = Review;

const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The user who writes the review
      required: true,
    },
    reviewerRole: {
      type: String,
      enum: ["supplier", "exporter"], // Role of the user who writes the review
      required: true,
    },
    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The user who is being reviewed (either supplier or exporter)
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // The order associated with the review
      required: true,
    },
    productName: {
      type: String,
      required: true,
      maxlength: 500,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      default: 1,
    },
    reviewText: {
      type: String,
      required: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "visible", "rejected"],
      default: "pending", // Initial status is "pending"
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
