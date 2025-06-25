// const mongoose = require("mongoose");
// // const customAlphabet = require("nanoid");

// // const numericAlphabet = "0123456789";
// // const generateOrderId = customAlphabet(numericAlphabet, 6);
// const { Counter } = require("./CounterSchema");  

// const getNextOrderId = async () => {
//   const counter = await Counter.findOneAndUpdate(
//     { _id: "orderId" },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
  
//   // Format the number as needed, e.g., 6 digit zero-padded string
//   // return counter.seq.toString().padStart(6, '0');
//     const seq = counter.seq || 1; // Fallback to 1 if seq is falsy
//   return seq.toString().padStart(6, '0');
// };

// let generateOrderId;
// (async () => {
//   const { customAlphabet } = await import('nanoid');
//   const numericAlphabet = "0123456789";
//   generateOrderId = customAlphabet(numericAlphabet, 6);
// })();

// const generateUniqueOrderId = async () => {
//   let isUnique = false;
//   let orderId;

//   while (!isUnique) {
//     orderId = generateOrderId();
//     const existingOrder = await mongoose.model("Order").findOne({ orderId });

//     if (!existingOrder) {
//       isUnique = true; // No existing order with this orderId, so it's unique
//     }
//   }

//   return orderId;
// };

// const OrderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     unique: true,  // Ensure the ID is unique
//     required: false,
//     default: "000000",  // Generate a new ID when creating an order
    
  
//   },
//   offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", required: false },
//   auctionId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Auction", 
//     required: false 
//   },
//   exporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   message: { type: String, maxlength: 500 },
//   status: {
//     type: String,
//     enum: [
//       "processing",        // initial
//       "waiting_for_sample",// after token payment
//       "completed",         // after sample accepted
//       "terminated",        // after sample rejected
//     ],
//     default: "processing",
//   },
// // Sample lifecycle status
//   sampleStatus: {
//     type: String,
//     enum: [
//       "waiting_for_payment",  // after order accepted
//       "waiting_for_sample",   // after token paid
//       "sent",                 // supplier has sent the sample
//       "received",             // exporter has received the sample
//       "sample_accepted",      // exporter accepted the sample
//       "sample_rejected",      // exporter rejected the sample
//     ],
//     default: "waiting_for_payment",
//   },
//   paymentIntentId: { type: String },  // Stores the Stripe payment intent ID
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "completed", "partial_refund","waiting_for_admin"],
//     default: "pending",
//   },

//    // New fields for sample proof
//    sampleProof: { type: String, required: false },  // URL or path to the sample image
//    sampleDescription: { type: String, maxlength: 500, required: false },  // Optional description of the sample
//   sampleRecievedProof:{ type: String, required: false },
//   sampleDecisionDeadline: { type: Date },
//   rejectionReason: { type: String, maxlength: 500, required: false },
//   Agreement: {
//     type: String,
//     enum: [
//       "Accepted",  // after order accepted
//       "Rejected",   // after token paid
//       "waiting_for_exporter",                 // supplier has sent the sample
//       "waiting_for_supplier",             // exporter has received the sample
//       "waiting_for_approval",
//           // exporter rejected the sample
//     ],
//     default: "waiting_for_approval",
//   },
//   AgreementRejectionReason: { type: String, maxlength: 500, required: false },
//    // Agreement statuses for both parties
//    exporterAgreementStatus: {
//     type: String,
//     enum: ["Accepted", "Rejected", "Waiting"],
//     default: "Waiting",
//   },
//   supplierAgreementStatus: {
//     type: String,
//     enum: ["Accepted", "Rejected", "Waiting"],
//     default: "Waiting",
//   },

//   paymentDetails: {
//     paymentMethod: { 
//       type: String, 
//       enum: ["Easypaisa", "JazzCash", "SadaPay", "NayaPay"], 
//       required: false 
//     },
//     mobileNumber: { 
//       type: String, 
//       required: false 
//     },
//     accountName: { 
//       type: String, 
//       required: false 
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed", "failed","detailsGiven"],
//       default: "pending",
//     },
//     paymentAmount: { type: Number, required: false },
//   },
//   LocalPaymentDetails: {
//     paymentMethod: { 
//       type: String, 
//       enum: ["Easypaisa", "JazzCash", "SadaPay", "NayaPay","Upaisa","other"], 
//       required: false 
//     },
//     mobileNumber: { 
//       type: String, 
//       required: false 
//     },
//     accountName: { 
//       type: String, 
//       required: false 
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed", "failed","detailsGiven"],
//       default: "pending",
//     },
//     localPaymentProof: { 
//       type: String, // URL to uploaded proof image
//       required: false 
//     },
//     paymentAmount: { type: Number, required: false },
//   },

//   createdAt: { type: Date, default: Date.now },
// });

// // OrderSchema.pre("save", async function(next) {
// //   if (!this.orderId) {
// //     this.orderId = await generateUniqueOrderId();  // Generate and assign unique orderId
// //   }
// //   next();
// // });

// // OrderSchema.pre("save", async function (next) {
// //   if (!this.orderId) {
// //     this.orderId = await getNextOrderId();
// //   }
// //   next();
// // });
// OrderSchema.pre("save", async function (next) {
//   if (this.isNew && this.orderId === "000000") {
//     this.orderId = await getNextOrderId();
//   }
//   next();
// });


// module.exports = mongoose.model("Order", OrderSchema);



const mongoose = require("mongoose");
// const customAlphabet = require("nanoid");

// const numericAlphabet = "0123456789";
// const generateOrderId = customAlphabet(numericAlphabet, 6);
const { Counter } = require("./CounterSchema");  

const getNextOrderId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  
  // Format the number as needed, e.g., 6 digit zero-padded string
  // return counter.seq.toString().padStart(6, '0');
    const seq = counter.seq || 1; // Fallback to 1 if seq is falsy
  return seq.toString().padStart(6, '0');
};

let generateOrderId;
(async () => {
  const { customAlphabet } = await import('nanoid');
  const numericAlphabet = "0123456789";
  generateOrderId = customAlphabet(numericAlphabet, 6);
})();

const generateUniqueOrderId = async () => {
  let isUnique = false;
  let orderId;

  while (!isUnique) {
    orderId = generateOrderId();
    const existingOrder = await mongoose.model("Order").findOne({ orderId });

    if (!existingOrder) {
      isUnique = true; // No existing order with this orderId, so it's unique
    }
  }

  return orderId;
};

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,  // Ensure the ID is unique
    required: false,
    default: "000000",  // Generate a new ID when creating an order
    
  
  },
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
  sample_needed:{type: Boolean,required: false, default:false },
  //  deliveryDays: { type: Number, required: false, min: 1, max: 100, default:1 },
  deliveryDays: { type: Date, required: false },
  message: { type: String, maxlength: 500 },
  status: {
    type: String,
    enum: [
      "processing",        // initial
      "waiting_for_sample",// after token payment
      "completed",         // after sample accepted
       "sample_sent", // new status when the sample is sent by the supplier
      "sample_received",
      "sample_accepted",
      "sample_rejected",
      "agreement_waiting", // when waiting for agreement to be accepted
      "agreement_accepted", // when both parties accept the agreement
      "order_shipped", // when the supplier ships the order
      "order_received", // when the exporter confirms receiving the order
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
    enum: ["pending", "completed", "partial_refund","waiting_for_admin"],
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
                "waiting_for_signing", // new status before final sign-off

    ],
    default: "waiting_for_approval",
  },
  agreementAcceptedDate: { type: Date, required: false },

  // New Fields for Order Shipment
  orderShippedDate: { type: Date, required: false },
  orderReceivedDate: { type: Date, required: false },

  // New Field for Supplier Confirmation of Order Shipment
  isOrderShipped: { type: Boolean, default: false },
  isOrderReceived: { type: Boolean, default: false },
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
      required: false 
    },
    mobileNumber: { 
      type: String, 
      required: false 
    },
    accountName: { 
      type: String, 
      required: false 
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed","detailsGiven"],
      default: "pending",
    },
    paymentAmount: { type: Number, required: false },
  },
  LocalPaymentDetails: {
    paymentMethod: { 
      type: String, 
      enum: ["Easypaisa", "JazzCash", "SadaPay", "NayaPay","Upaisa","other"], 
      required: false 
    },
    mobileNumber: { 
      type: String, 
      required: false 
    },
    accountName: { 
      type: String, 
      required: false 
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed","detailsGiven"],
      default: "pending",
    },
     
    localPaymentProof: { 
      type: String, // URL to uploaded proof image
      required: false 
    },
    paymentAmount: { type: Number, required: false },

  },

  createdAt: { type: Date, default: Date.now },
   trackingId: { 
    type: String, 
    required: false, // Tracking ID may not be available initially
    maxlength: 50,   // Max length for tracking ID, depending on courier service
  },
});

// OrderSchema.pre("save", async function(next) {
//   if (!this.orderId) {
//     this.orderId = await generateUniqueOrderId();  // Generate and assign unique orderId
//   }
//   next();
// });

// OrderSchema.pre("save", async function (next) {
//   if (!this.orderId) {
//     this.orderId = await getNextOrderId();
//   }
//   next();
// });
OrderSchema.pre("save", async function (next) {
  if (this.isNew && this.orderId === "000000") {
    this.orderId = await getNextOrderId();
  }
  next();
});


module.exports = mongoose.model("Order", OrderSchema);
