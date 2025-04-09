const Order = require("../../models/offer/orderSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



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


// Route for supplier to prepare and send the sample after payment confirmation
const prepareSample = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

  if (order.status !== "waiting_for_sample") {
    return res.status(400).json({ message: "Order is not ready for sample preparation" });
  }

  // Update the status of the order to "sample sent"
  order.sampleStatus = "sent";
  await order.save();

  // Notify the supplier that the payment is secured and they can send the sample
  res.status(200).json({ message: "Supplier notified to send sample", order });
};
// Route for the exporter to confirm sample receipt
const confirmSampleReceipt = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

  if (order.sampleStatus !== "sent") {
    return res.status(400).json({ message: "Sample not sent yet" });
  }

  // Once the sample is received, mark it as "sample_received"
  order.sampleStatus = "received";
  await order.save();

  // Release the token payment to the supplier if the sample is accepted
  if (order.status === "waiting_for_sample") {
    await stripe.paymentIntents.capture(order.paymentIntentId);
    order.paymentStatus = "completed";
    order.status = "sample_accepted";  // Mark order as accepted
    await order.save();
  }

  // Optionally, notify the supplier that the sample has been accepted
  res.status(200).json({ message: "Sample received and token payment completed", order });
};
// Route for the exporter to reject the sample
const rejectSample = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);

  if (order.sampleStatus !== "received") {
    return res.status(400).json({ message: "Sample must be received before rejection" });
  }

  // Refund 50% to the exporter and give 50% to the supplier
  const refundAmount = Math.round(order.price / 2 * 100); // Refund half of the token payment
  await stripe.refunds.create({ payment_intent: order.paymentIntentId });

  // Update order status
  order.status = "sample_rejected";
  await order.save();

  // Notify both parties
  res.status(200).json({ message: "Sample rejected, 50% refunded to the exporter and 50% to the supplier", order });
};


module.exports = {
    getOrdersBySupplier,getOrdersByExporter
};