// // backend/models/User.js
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePicture: {
//     type: String,
//     default:
//       "https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7",
//   },
//   role: { type: String, enum: ["exporter", "supplier"], required: true },

//   otp: String,
//   otpExpires: Date,
// });

// const roles = {
//   EXPORTER: "exporter",
//   SUPPLIER: "supplier",
// };


// module.exports = mongoose.model("User", UserSchema);




// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7",
  },
  role: { type: String, enum: ["exporter", "supplier"], required: true },
  otp: String,
  otpExpires: Date,
  fcmToken: { type: String, default: null },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  city: { type: String }, // New field
  cnic: { type: String, unique: true, sparse: true }, // New field (unique but optional)
  
  phoneNumber: { type: String }, // New field
  businessName: { type: String }, // New field
  businessAddress: { type: String }, // New field
  postalCode: { type: String }, // New field
  bio: { type: String }, // New field
  dateOfBirth: { type: Date }, 
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
