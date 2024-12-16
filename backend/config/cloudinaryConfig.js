const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(process.env.CLOUDINARY_CLOUD_NAME); // Add this to verify
console.log(process.env.CLOUDINARY_API_KEY); // Add this to verify
console.log(process.env.CLOUDINARY_API_SECRET); // Add this to verify

// Alternative method to check Cloudinary configuration
cloudinary.api.resources()
  .then(response => {
    console.log("Cloudinary Connection Successful", response);
  })
  .catch(error => {
    console.error("Cloudinary Error:", error);
  });

module.exports = cloudinary;
