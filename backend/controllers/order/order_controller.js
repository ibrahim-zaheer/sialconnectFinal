const Order = require("../../models/offer/orderSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const multer = require("multer");
const path = require("path");
// const cloudinary = require("../../utils/cloudinaryConfig"); 


const initiateTokenPayment = async (req, res) => {
  try {
    const { orderId, tokenAmount } = req.body; // The order ID and token payment amount
    const order = await Order.findById(orderId);

    // Create Stripe PaymentIntent to hold funds in escrow
    const paymentIntent = await stripe.paymentIntents.create({
      amount: tokenAmount, // Token amount in smallest currency unit (e.g., cents)
      currency: 'usd',
      description: 'Token Payment for Sample',
      capture_method: 'manual',  // Hold the payment for later capture
    });

    order.paymentStatus = "pending";
    order.paymentIntentId = paymentIntent.id;
    order.sampleStatus = "waiting_for_sample"; // Change the status to waiting for sample
    await order.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment', error });
  }
};
// ✅ Get all orders for the logged-in supplier
const getOrdersBySupplier = async (req, res) => {
    try {
      const supplierId = req.user.id;
  
      const orders = await Order.find({ supplierId })
        .populate("exporterId", "name email")   // Optional: populate exporter info
        .populate("productId", "name")          // Optional: populate product info
        .populate("auctionId", "title")
        .sort({ createdAt: -1 });               // Optional: latest orders first
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this supplier." });
      }
  
      res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving orders", error });
    }
  };

  // ✅ Get all orders placed by a specific exporter via URL param
const getOrdersByExporter = async (req, res) => {
  try {
    const exporterId = req.user.id;

    const orders = await Order.find({ exporterId })
      .populate("supplierId", "name email")    // Optional: show supplier info
      .populate("productId", "name") 
      .populate("auctionId", "title")          // Optional: show product info
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this exporter." });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

const getOrderDetailsForSupplier = async (req, res) => {
  try {
    const { orderId } = req.params;
    const supplierId = req.user.id; // Assuming auth middleware sets req.user

    const order = await Order.findOne({ _id: orderId, supplierId })
      .populate("exporterId", "name email")
      .populate("productId", "name")
      .populate("auctionId", "title");

    if (!order) {
      return res.status(404).json({ message: "Order not found for this supplier." });
    }

    res.status(200).json({ message: "Order details retrieved successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order details", error });
  }
};


const getOrderDetailsForExporter = async (req, res) => {
  try {
    const { orderId } = req.params;
    const exporterId = req.user.id; // Assuming auth middleware sets req.user

    const order = await Order.findOne({ _id: orderId, exporterId })
      .populate("supplierId", "name email")
      .populate("productId", "name")
      .populate("auctionId", "title");

    if (!order) {
      return res.status(404).json({ message: "Order not found for this supplier." });
    }

    res.status(200).json({ message: "Order details retrieved successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order details", error });
  }
};



// const markSampleSent = async (req, res) => {
//   const { orderId } = req.body;
//   const order = await Order.findById(orderId);

//   if (order.sampleStatus !== 'waiting_for_sample') {
//     return res.status(400).json({ message: 'Not ready to send sample yet' });
//   }

//   order.sampleStatus = 'sent';
//   await order.save();

//   res.status(200).json({ message: 'Sample marked as sent' });
// };

const markSampleSent = async (req, res) => {
  try {
    const { orderId, description } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.sampleStatus !== 'waiting_for_sample') {
      return res.status(400).json({ message: 'Not ready to send sample yet' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Sample image is required' });
    }

    // Update order with sample details
    order.sampleStatus = 'sent';
    order.sampleProof = req.file.path; // Cloudinary URL
    order.sampleDescription = description || '';
    await order.save();

    res.status(200).json({ 
      message: 'Sample marked as sent with image', 
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error sending sample', 
      error: error.message 
    });
  }
};

// Route for the exporter to confirm sample receipt
const confirmSampleReceipt = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

   // Check if the order exists
   if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  if (order.sampleStatus !== "sent") {
    return res.status(400).json({ message: "Sample not sent yet" });
  }
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Sample image is required' });
    }


  // Once the sample is received, mark it as "sample_received"
  order.sampleStatus = "received";
  order.sampleRecievedProof = req.file.path;
  await order.save();

  // // Release the token payment to the supplier if the sample is accepted
  // if (order.sampleStatus === "received") {
  //   await stripe.paymentIntents.capture(order.paymentIntentId);
  //   order.paymentStatus = "completed";
  //   // order.status = "sample_accepted";  // Mark order as accepted
  //   await order.save();
  // }

  // // Optionally, notify the supplier that the sample has been accepted
  // res.status(200).json({ message: "Sample received and token payment completed", order });
    // Release the token payment to the supplier if the sample is received
    try {
      // Capture the payment intent
      await stripe.paymentIntents.capture(order.paymentIntentId);
      order.paymentStatus = "completed"; // Mark payment as completed
  
     
  
      await order.save();
  
      res.status(200).json({ message: "Sample received and token payment completed", order });
    } catch (error) {
      res.status(500).json({
        message: "Error capturing payment or updating order status",
        error: error.message,
      });
    }
};
// Route for the exporter to reject the sample
// Sample Reject Route
const rejectSample = async (req, res) => {
  try {
    const { orderId, rejectionReason } = req.body;
    const order = await Order.findById(orderId);

    if (order.sampleStatus !== 'received') {
      return res.status(400).json({ message: 'Sample not yet received' });
    }

    await stripe.refunds.create({ payment_intent: order.paymentIntentId });

    order.sampleStatus = 'sample_rejected';
    order.rejectionReason = rejectionReason;
    await order.save();

    res.status(200).json({ message: 'Sample rejected and refunded' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting sample', error });
  }
};

const approveSample = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.sampleStatus !== 'received') {
      return res.status(400).json({ message: 'Sample not yet received' });
    }

    console.log("Order found and sample status is 'received'");

    // Capture the payment intent
    // await stripe.paymentIntents.capture(order.paymentIntentId);
    order.sampleStatus = 'sample_accepted';
    order.status = 'completed';
    order.paymentStatus = 'completed';
    

    await order.save();
    res.status(200).json({ message: 'Sample approved, payment released to supplier' });
  } catch (error) {
    console.error('Error in approveSample:', error);
    res.status(500).json({ message: 'Error approving sample', error });
  }
};


const acceptAgreement = async (req, res) => {
  try {
    const { orderId, role } = req.body; // `role` indicates if the user is exporter or supplier
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Set the appropriate agreement status based on the role
    if (role === "exporter") {
      order.exporterAgreementStatus = "Accepted";
      if (order.supplierAgreementStatus === "Accepted") {
        order.Agreement = "Accepted"; // Both sides accepted
      } else {
        order.Agreement = "waiting_for_supplier"; // Waiting for supplier
      }
    } else if (role === "supplier") {
      order.supplierAgreementStatus = "Accepted";
      if (order.exporterAgreementStatus === "Accepted") {
        order.Agreement = "Accepted"; // Both sides accepted
      } else {
        order.Agreement = "waiting_for_exporter"; // Waiting for exporter
      }
    }

    await order.save();
    res.status(200).json({ message: "Agreement status updated", order });
  } catch (error) {
    console.error("Error accepting the agreement:", error);
    res.status(500).json({ message: "Error accepting the agreement", error });
  }
};
// Handle rejection of agreement by the exporter
const rejectAgreement = async (req, res) => {
  try {
    const { orderId, AgreementRejectionReason,role } = req.body;
    const order = await Order.findById(orderId);

    // Ensure order exists and sample is received
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.sampleStatus !== "sample_received") {
      return res.status(400).json({ message: "Sample not yet received" });
    }

        // Reject the agreement if either party rejects
        if (role === "exporter") {
          order.exporterAgreementStatus = "Rejected";
        } else if (role === "supplier") {
          order.supplierAgreementStatus = "Rejected";
        }
    // Update the Agreement status to Rejected
    order.Agreement = "Rejected";
    order.status = "terminated";  // Mark order as terminated
    order.AgreementRejectionReason = AgreementRejectionReason;

    // Refund the token payment if any
    if (order.paymentStatus === "pending") {
      await stripe.refunds.create({ payment_intent: order.paymentIntentId });
      order.paymentStatus = "partial_refund";
    }

    // Save rejection reason
    order.AgreementRejectionReason = AgreementRejectionReason;

    await order.save();

    res.status(200).json({ message: "Agreement rejected, payment refunded", order });
  } catch (error) {
    console.error("Error in accept-agreement route:", error); // Log the error
    res.status(500).json({ message: "Error rejecting the agreement", error });
  }
};


module.exports = {
    getOrdersBySupplier,getOrdersByExporter,approveSample,rejectSample,initiateTokenPayment,markSampleSent,confirmSampleReceipt,getOrderDetailsForSupplier,getOrderDetailsForExporter,acceptAgreement,rejectAgreement
};