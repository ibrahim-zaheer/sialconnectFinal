const mongoose = require("mongoose");

const AdminVerificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionReason: {
    type: String,
    maxlength: 500,
  },
  websiteUrl: {
    type: String,
    maxlength: 200,
    // optional: add regex validation if you want to ensure proper URL format
  },
 image: {
  type: [String],
  default: [
    "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
  ],
},
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },
}, { timestamps: true });

const AdminVerification = mongoose.models.AdminVerification || mongoose.model("AdminVerification", AdminVerificationSchema);

module.exports = AdminVerification;
