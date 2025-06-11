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

    // order.paymentStatus = "pending";
    order.paymentStatus = "completed";

    order.paymentIntentId = paymentIntent.id;
    order.sampleStatus = "waiting_for_sample"; // Change the status to waiting for sample
    await order.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment from stripe', error });
  }
};

const initiateLocalPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, mobileNumber, accountName, paymentAmount, localPaymentProof } = req.body;

    // Validate required fields\
    if (!orderId || !paymentMethod || !mobileNumber || !paymentAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Payment Proof is required' });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);

    // If order is not found, return error
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order's LocalPaymentDetails
    order.LocalPaymentDetails.paymentMethod = paymentMethod;
    order.LocalPaymentDetails.mobileNumber = mobileNumber;
    order.LocalPaymentDetails.accountName = accountName;
    order.LocalPaymentDetails.paymentAmount = paymentAmount;
    order.LocalPaymentDetails.localPaymentProof = req.file.path;
    order.LocalPaymentDetails.paymentStatus = "detailsGiven"; // Initially, set payment status to "pending"


    order.paymentStatus = "waiting_for_admin";
   
    // order.sampleStatus = "waiting_for_sample"; 

    // Save the order with the updated local payment details
    await order.save();

    // Respond with the updated order details
    res.status(200).json({
      message: "Local payment details updated successfully",
      order: order,
    });
  } catch (error) {
    console.error("Error initiating local payment:", error);
    console.log("the error is "+error);
    res.status(500).json({ message: "Error initiating local payment", error });
  }
};


const confirmLocalPaymentByAdmin = async (req, res) => {
  try {
    const { orderId } = req.body; // Order ID passed from the request

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the local payment details are available
    if (!order.LocalPaymentDetails) {
      return res.status(400).json({ message: "Local payment is  missing" });
    }
    if (order.LocalPaymentDetails.paymentStatus === "pending") {
      return res.status(400).json({ message: "Local payment is  not pending" });
    }

    // Check if the payment proof is uploaded
    if (!order.LocalPaymentDetails.localPaymentProof) {
      return res.status(400).json({ message: "Local payment proof is missing" });
    }

    // Mark the local payment as completed
    order.LocalPaymentDetails.paymentStatus = "completed";  // Update to completed

    // Update the overall payment status to completed
    // order.paymentStatus = "completed"; // Once confirmed, set the payment status to "completed"

    // Optionally, we can also update sampleStatus to indicate it's ready for processing
    order.sampleStatus = "waiting_for_sample"; // Set sample status to "waiting_for_sample"

    await order.save(); // Save the updated order

    res.status(200).json({ message: "Local payment confirmed successfully", order });
  } catch (error) {
    console.error("Error confirming local payment:", error);
    res.status(500).json({ message: "Error confirming local payment", error });
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

// ✅ Get all orders from the Order schema in the database
const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find()
      .populate("supplierId", "name email")    // Optional: show supplier info
      .populate("productId", "name") 
      .populate("auctionId", "title")          // Optional: show product info
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

// Get top 3 most ordered products
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $group: {
          _id: "$productId",
          count: { $sum: 1 } // Count occurrences of each productId
        }
      },
      { $sort: { count: -1 } }, // Sort by count descending
      { $limit: 3 }, // Limit to top 3
      {
        $lookup: { // Join with Product collection to get product details
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" } // Flatten the array
    ]);

    if (!topProducts.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json({ 
      message: "Top products retrieved successfully", 
      topProducts 
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving top products", error });
  }
};

const getOrderByOfferId = async (req, res) => {
  try {
    const { offerId } = req.params;
    // const userId = req.user.id; // Get the logged-in user's ID

    // Find the order by offerId and ensure the user is either exporter or supplier
    const order = await Order.findOne({
      offerId,
      // $or: [{ exporterId: userId }, { supplierId: userId }]
    })
      .populate("exporterId", "name email")
      .populate("supplierId", "name email")
      .populate("productId", "name")
      .populate("auctionId", "title");

    if (!order) {
      return res.status(404).json({ 
        message: "Order not found or you don't have access to this order" 
      });
    }

    res.status(200).json({ 
      message: "Order retrieved successfully", 
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error retrieving order", 
      error: error.message 
    });
  }
};

const getTopSuppliers = async (req, res) => {
  try {
    const topSuppliers = await Order.aggregate([
      {
        $group: {
          _id: "$supplierId",  // Group by supplierId
          count: { $sum: 1 }    // Count the occurrences (orders) for each supplierId
        }
      },
      { $sort: { count: -1 } },  // Sort by the number of orders in descending order (top suppliers first)
      { $limit: 3 },             // Limit to the top 3 suppliers
      {
        $lookup: {               // Join with the "User" collection to get supplier details
          from: "users",         // The collection containing the supplier data (assuming "User" collection holds both exporters and suppliers)
          localField: "_id",     // The field to join on (supplierId)
          foreignField: "_id",   // The field in the "User" collection (supplierId)
          as: "supplierDetails"  // Alias for the result of the join
        }
      },
      { $unwind: "$supplierDetails" }  // Flatten the supplierDetails array to access individual fields
    ]);

    if (!topSuppliers.length) {
      return res.status(404).json({ message: "No suppliers found." });
    }

    // Return the top suppliers
    res.status(200).json({
      message: "Top suppliers retrieved successfully",
      topSuppliers
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving top suppliers", error });
  }
};


const getOrderDetailsForSupplier = async (req, res) => {
  try {
    const { orderId } = req.params;
    const supplierId = req.user.id; // Assuming auth middleware sets req.user

    const order = await Order.findOne({ _id: orderId, supplierId })
      .populate("exporterId", "name email")
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


const getOrderDetailsById = async (req, res) => {
  try {
    const { orderId } = req.params; // Get the orderId from the URL parameter

    // Find the order by its orderId
    const order = await Order.findById(orderId)
      .populate("exporterId", "name email") // Populate exporter information
      .populate("supplierId", "name email") // Populate supplier information
      .populate("productId", "name")        // Populate product information
      .populate("auctionId", "title")      // Populate auction information
      .populate("LocalPaymentDetails")     // Optionally, populate Local Payment Details
      .populate("paymentDetails")          // Optionally, populate Payment Details
      .sort({ createdAt: -1 });            // Optional: sort by the creation date if needed

    // If the order does not exist, return a 404 error
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    console.log(order);

    // Return the order details
    res.status(200).json({ message: "Order details retrieved successfully", order });
  } catch (error) {
    // Handle any errors that occur during the process
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
    order.status = 'terminated';
    order.rejectionReason = rejectionReason;
    await order.save();

    res.status(200).json({ message: 'Sample rejected and refunded' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting sample', error });
    console.log("error");
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
        //chatgpt 9 june 2025
          order.status = "agreement_accepted"; // Update the status to agreement accepted
      } else {
        order.Agreement = "waiting_for_supplier"; // Waiting for supplier
      }
    } else if (role === "supplier") {
      order.supplierAgreementStatus = "Accepted";
      if (order.exporterAgreementStatus === "Accepted") {
        order.Agreement = "Accepted"; // Both sides accepted
        order.status = "agreement_accepted"; 
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

const addPaymentDetailsForSupplier = async (req, res) => {
  try {
    const { orderId, paymentMethod, mobileNumber, accountName, paymentAmount } = req.body;

    // Check if the order exists and if the logged-in user is the supplier for the order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.supplierId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update payment details for this order" });
    }

    // Check if the payment details are already entered
    if (order.paymentDetails && order.paymentDetails.paymentStatus !== "pending") {
      return res.status(400).json({ message: "Payment details have already been entered or completed" });
    }

    // Set the payment details for the supplier
    order.paymentDetails = {
      paymentMethod,
      mobileNumber,
      accountName,
      paymentAmount,
      paymentStatus: "detailsGiven",  // Set payment status as "pending"
    };

    // Update the sample status to indicate waiting for payment
    // order.sampleStatus = "waiting_for_payment";

    // Save the updated order
    await order.save();

    res.status(200).json({
      message: "Payment details added successfully",
      order,
    });
  } catch (error) {
    console.error("Error adding payment details:", error);
    res.status(500).json({
      message: "Error adding payment details",
      error: error.message,
    });
  }
};

const markPaymentAsCompleted = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure payment details were added previously
    if (!order.paymentDetails || order.paymentDetails.paymentStatus !== "detailsGiven") {
      return res.status(400).json({ message: "Payment details not provided or already completed" });
    }

    // Update the payment status inside paymentDetails
    order.paymentDetails.paymentStatus = "completed";
    await order.save();

    res.status(200).json({
      message: "Payment marked as completed successfully",
      order,
    });
  } catch (error) {
    console.error("Error marking payment as completed:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const markPaymentAsRejected = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure payment details were added previously
    if (!order.paymentDetails || order.paymentDetails.paymentStatus !== "detailsGiven") {
      return res.status(400).json({ message: "Payment details not provided or already completed" });
    }

    // Update the payment status inside paymentDetails
    order.paymentDetails.paymentStatus = "failed";
    await order.save();

    res.status(200).json({
      message: "Payment marked as Rejected successfully",
      order,
    });
  } catch (error) {
    console.error("Error marking payment as completed:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// const getAllOrdersWithPaymentDetails = async (req, res) => {
//   try {
//     const orders = await Order.find({}) // Fetch all orders
//       .select("price quantity paymentDetails") // Select only relevant fields
//       .populate("exporterId", "name email") // Optionally, populate exporter info
//       .populate("supplierId", "name email") // Optionally, populate supplier info
//       .sort({ createdAt: -1 }); // Sort by creation date (optional)

//     if (!orders.length) {
//       return res.status(404).json({ message: "No orders found." });
//     }

//     res.status(200).json({ message: "Orders retrieved successfully", orders });
//   } catch (err) {
//     res.status(500).json({ message: "Error retrieving orders", error: err.message });
//   }
// };


const getAllOrdersWithPaymentDetails = async (req, res) => {
  try {
    const orders = await Order.find({}) // Fetch all orders
      .select("price quantity paymentDetails LocalPaymentDetails paymentStatus") // Select relevant fields, including LocalPaymentDetails
      .populate("exporterId", "name email") // Optionally, populate exporter info
      .populate("supplierId", "name email") // Optionally, populate supplier info
      .sort({ createdAt: -1 }); // Sort by creation date (optional)

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving orders", error: err.message });
  }
};

const getAllPaymentsForSupplier = async (req, res) => {
  try {
    const supplierId = req.user.id; // Get the logged-in supplier's ID from req.user

    // Fetch all orders related to the supplier with payment details
    const orders = await Order.find({ supplierId}) // Only fetch orders with provided payment details
      .populate("exporterId", "name email")   // Optional: populate exporter info
      .populate("productId", "name")          // Optional: populate product info
      .populate("auctionId", "title")         // Optional: populate auction info
      .sort({ createdAt: -1 });            
      console.log("the supplier id is "+supplierId);   // Optional: latest orders first
      console.log( "the orders are "+orders);  
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found with payment details for this supplier." });
    }

    res.status(200).json({ message: "Orders with payment details retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders with payment details", error });
  }
};

// Supplier confirms order shipment
const markOrderShipped = async (req, res) => {
  try {
    const { orderId } = req.body; // Order ID passed in request body
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "agreement_accepted") {
      return res.status(400).json({ message: "Agreement must be accepted first" });
    }

    order.isOrderShipped = true;
    order.orderShippedDate = new Date();
    order.status = "order_shipped"; // Set status to shipped

    await order.save();
    res.status(200).json({ message: "Order marked as shipped", order });
  } catch (error) {
    res.status(500).json({ message: "Error marking order as shipped", error });
  }
};

// Exporter confirms order receipt
const confirmOrderReceipt = async (req, res) => {
  try {
    const { orderId } = req.body; // Order ID passed in request body
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.isOrderShipped) {
      return res.status(400).json({ message: "Order not yet shipped by supplier" });
    }

    order.isOrderReceived = true;
    order.orderReceivedDate = new Date();
    order.status = "order_received"; // Set status to received

    await order.save();
    res.status(200).json({ message: "Order confirmed as received", order });
  } catch (error) {
    res.status(500).json({ message: "Error confirming order receipt", error });
  }
};


module.exports = {
    getOrdersBySupplier,getOrdersByExporter,approveSample,rejectSample,initiateTokenPayment,markSampleSent,confirmSampleReceipt,getOrderDetailsForSupplier,getOrderDetailsForExporter,acceptAgreement,rejectAgreement, addPaymentDetailsForSupplier,markPaymentAsCompleted,getAllOrdersWithPaymentDetails,getAllPaymentsForSupplier,initiateLocalPayment,confirmLocalPaymentByAdmin,getOrderDetailsById,getAllOrders,getTopProducts,getTopSuppliers,getOrderByOfferId, markOrderShipped, confirmOrderReceipt
};