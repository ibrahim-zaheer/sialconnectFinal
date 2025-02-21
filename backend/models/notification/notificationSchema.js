const mongoose = require('mongoose');

// Define the schema for a Notification
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user who will receive the notification
  },
  
  message: {
    type: String,
    required: true, // The notification message to be displayed
  },
 
  isRead: {
    type: Boolean,
    default: false, // Indicates whether the notification has been read by the user
  },
  timestamp: {
    type: Date,
    default: Date.now, // Timestamp for when the notification was created
  },
  actionUrl: {
    type: String,
    required: false, // URL to direct the user to the relevant page (e.g., photo page)
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
