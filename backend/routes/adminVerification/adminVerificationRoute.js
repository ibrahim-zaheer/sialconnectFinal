const express = require("express");
const router = express.Router();

const isAdmin = require("../../middleware/isAdmin");

const verifyToken = require("../../middleware/verifyToken");

const authenticateMiddleware = require("../../middleware/authMiddleware");

const {uploadStoreImage} = require("../../config/multerConfig");
// const authenticateMiddleware = require("../../middleware/authMiddleware");

const {
  createVerificationRequest,
} = require("../../controllers/adminVerification/AdminVerificationController");

router.post("/request", authenticateMiddleware,uploadStoreImage.array("images", 5),createVerificationRequest);

module.exports = router;
