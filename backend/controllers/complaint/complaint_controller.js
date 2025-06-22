const Complaint = require("../../models/offer/ComplaintSchema");
const Order = require("../../models/offer/orderSchema");

// Create a new complaint
const createComplaint = async (req, res) => {
  const { orderId, topic, message } = req.body;

  if (!orderId || !topic || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Create a new complaint
    const complaint = new Complaint({
      orderId,
      topic,
      message,
    });

    // Save the complaint
    await complaint.save();

    res.status(201).json({
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all complaints for a particular order (with exporter and supplier details)
const getComplaintsByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch complaints and populate orderId with exporterId and supplierId
    const complaints = await Complaint.find({ orderId })
      .populate("orderId", "exporterId supplierId")
      .exec();

    if (complaints.length === 0) {
      return res.status(404).json({ message: "No complaints found for this order" });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Resolve a complaint (mark it as resolved)
const resolveComplaint = async (req, res) => {
  const { complaintId } = req.params;

  try {
    // Find the complaint and update the resolved status
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { resolved: true },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({
      message: "Complaint resolved successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    // Fetch all complaints and populate orderId with exporterId and supplierId
    // const complaints = await Complaint.find()
    //   .populate("orderId", "exporterId supplierId") // Populating with details of the order
    //   .exec();

      const complaints = await Complaint.find()
      .populate({
        path: 'orderId', // Populating the 'orderId' reference
        populate: [
          { path: 'exporterId', select: 'name email' }, // Populate exporterId with name
          { path: 'supplierId', select: 'name email' }, // Populate supplierId with name
        ],
      })
      .exec();

    

    if (complaints.length === 0) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createComplaint,
  getComplaintsByOrderId,
  resolveComplaint,
  getAllComplaints,
};
