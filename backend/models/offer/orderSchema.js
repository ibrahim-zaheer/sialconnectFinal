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
  status: {
    type: String,
    enum: [
      "processing",        // initial
      "waiting_for_sample",// after token payment
      "completed",         // after sample accepted
      "terminated",        // after sample rejected
    ],
    default: "processing",
  },
// Sample lifecycle status
  sampleStatus: {
    type: String,
    enum: [
      "waiting_for_payment",  // after order accepted
      "waiting_for_sample",   // after token paid
      "sent",                 // supplier has sent the sample
      "received",             // exporter has received the sample
      "sample_accepted",      // exporter accepted the sample
      "sample_rejected",      // exporter rejected the sample
    ],
    default: "waiting_for_payment",
  },
  paymentIntentId: { type: String },  // Stores the Stripe payment intent ID
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "partial_refund"],
    default: "pending",
  },

   // New fields for sample proof
   sampleProof: { type: String, required: false },  // URL or path to the sample image
   sampleDescription: { type: String, maxlength: 500, required: false },  // Optional description of the sample
  sampleRecievedProof:{ type: String, required: false },
  sampleDecisionDeadline: { type: Date },
  rejectionReason: { type: String, maxlength: 500, required: false },
  Agreement: {
    type: String,
    enum: [
      "Accepted",  // after order accepted
      "Rejected",   // after token paid
      "waiting_for_exporter",                 // supplier has sent the sample
      "waiting_for_supplier",             // exporter has received the sample
      "waiting_for_approval",
          // exporter rejected the sample
    ],
    default: "waiting_for_approval",
  },
  AgreementRejectionReason: { type: String, maxlength: 500, required: false },
   // Agreement statuses for both parties
   exporterAgreementStatus: {
    type: String,
    enum: ["Accepted", "Rejected", "Waiting"],
    default: "Waiting",
  },
  supplierAgreementStatus: {
    type: String,
    enum: ["Accepted", "Rejected", "Waiting"],
    default: "Waiting",
  },

  paymentDetails: {
    paymentMethod: { 
      type: String, 
      enum: ["Easypaisa", "JazzCash", "SadaPay", "NayaPay"], 
      required: true 
    },
    mobileNumber: { 
      type: String, 
      required: true 
    },
    accountName: { 
      type: String, 
      required: true 
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed","detailsGiven"],
      default: "pending",
    },
    paymentAmount: { type: Number, required: true },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
