const express = require("express");
const { createComplaint, getComplaintsByOrderId, resolveComplaint,getAllComplaints } = require("../../controllers/complaint/complaint_controller");
const isAdmin = require("../../middleware/isAdmin");

const verifyToken = require("../../middleware/verifyToken")


const router = express.Router();

// Route to create a new complaint
router.post("/complaints", createComplaint);

router.get("/complaints",getAllComplaints);

// Route to get all complaints for a specific order
router.get("/complaints/:orderId", getComplaintsByOrderId);


// Route to resolve a complaint
router.put("/complaints/resolve/:complaintId", resolveComplaint);

module.exports = router;
