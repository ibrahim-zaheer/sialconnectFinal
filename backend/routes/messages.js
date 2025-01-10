const express = require("express");
const router = express.Router();
const ChatMessage = require("../models/ChatMessage");

// GET /messages - Fetch messages between two users
router.get("/messages/:sender/:receiver", async (req, res) => {
    try {
        const { sender, receiver } = req.params;

        // Validate inputs
        if (!sender || !receiver) {
            return res.status(400).json({ error: "Sender and receiver are required" });
        }

        // Fetch messages exchanged between sender and receiver
        const messages = await ChatMessage.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ timestamp: 1 }); // Sort messages by timestamp

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /messages - Send a message from sender to receiver
router.post("/messages", async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;

        // Validate inputs
        if (!sender || !receiver || !message) {
            return res.status(400).json({ error: "Sender, receiver, and message are required" });
        }

        // Create and save the new message
        const chatMessage = new ChatMessage({
            sender,
            receiver,
            message,
        });

        await chatMessage.save();

        res.status(201).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
