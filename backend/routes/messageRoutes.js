const { getUsersForSidebar, getMessages, sendMessage,sendingVoiceMessage } = require("../controllers/message_controller.js");
const authenticateMiddleware = require("../middleware/authMiddleware.js");
const User = require("../models/User.js");
const express = require("express");
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload/voice', upload.single('voice'),sendingVoiceMessage);


router.get("/users", authenticateMiddleware, getUsersForSidebar);
router.get("/:id", authenticateMiddleware, getMessages);
router.post("/send/:id", authenticateMiddleware, sendMessage);

router.get("/users/:id",async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router; // Use CommonJS export
