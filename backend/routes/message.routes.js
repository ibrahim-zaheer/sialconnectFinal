const { getUsersForSidebar, getMessages, sendMessage } = require("../controllers/message_controller");
const authenticateMiddleware = require("../middleware/authMiddleware.js");
const express = require("express");
const router = express.Router();

router.get("/users", authenticateMiddleware, getUsersForSidebar);
router.get("/:id", authenticateMiddleware, getMessages);
router.get("/send/:id", authenticateMiddleware, sendMessage);

module.exports = router; // Use CommonJS export
