// // models/ChatMessage.js

// const mongoose = require('mongoose');

// const chatMessageSchema = new mongoose.Schema({
// 	user: { type: String, required: true },
// 	message: { type: String, required: true },
// 	timestamp: { type: Date, default: Date.now },
// });

// const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// module.exports = ChatMessage;


const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },  // The user sending the message
    receiver: { type: String, required: true }, // The user receiving the message
    message: { type: String, required: true }, // The content of the message
    timestamp: { type: Date, default: Date.now }, // When the message was sent
});

// Create the ChatMessage model
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
