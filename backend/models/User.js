// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture:{type: String,default:"https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7"},
  role: { type: String, enum: ["exporter", "supplier"], required: true },

  otp: String,
  otpExpires: Date,
});

const roles = {
  EXPORTER: "exporter",
  SUPPLIER: "supplier"
};

module.exports = mongoose.model("User", UserSchema);
