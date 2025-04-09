const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },

    voiceMessage: {
      type: String, // This will store the Firebase Storage URL
    },
    duration: {
      type: Number, // Duration of the voice message in seconds
    }
   
  },
  { timestamps: true }
);

module.exports= mongoose.model("Message", messageSchema);

