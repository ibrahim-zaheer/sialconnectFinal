const express = require("express");
const router = express.Router();

const isAdmin = require("../../middleware/isAdmin");

const verifyToken = require("../../middleware/verifyToken");

const authenticateMiddleware = require("../../middleware/authMiddleware");

const { uploadStoreImage } = require("../../config/multerConfig");
// const authenticateMiddleware = require("../../middleware/authMiddleware");

const {
  createVerificationRequest,
  getAllAdminVerifications,
  approveVerificationRequest,
  getUserVerificationStatus,rejectVerificationRequest,
} = require("../../controllers/adminVerification/AdminVerificationController");

router.post(
  "/request",
  authenticateMiddleware,
  uploadStoreImage.array("images", 5),
  createVerificationRequest
);

router.get("/supplierRequests", verifyToken, isAdmin, getAllAdminVerifications);

router.put("/approve/:id", verifyToken, isAdmin, approveVerificationRequest);

router.put("/reject/:id", verifyToken, isAdmin, rejectVerificationRequest);

router.get("/myRequests", authenticateMiddleware, getUserVerificationStatus);

module.exports = router;
