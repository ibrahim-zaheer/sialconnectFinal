const express = require("express");
const router = express.Router();
const ChatMessage = require("../models/ChatMessage");

// GET /messages/:sender/:receiver
router.get("/:sender/:receiver", async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await ChatMessage.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /messages
router.post("/", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    if (!sender || !receiver || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const chatMessage = new ChatMessage({ sender, receiver, message });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
