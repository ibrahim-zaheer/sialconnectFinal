const AdminVerification = require("../../models/adminVerification/AdminVerification");
const User = require("../../models/User");

const createVerificationRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { websiteUrl } = req.body;
    const images = req.files; // Get files from multer

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "supplier") {
      return res.status(403).json({ message: "Only suppliers can request verification." });
    }

    const existingRequest = await AdminVerification.findOne({ 
      user: userId, 
      status: "pending" 
    });
    if (existingRequest) {
      return res.status(400).json({ message: "You already have a pending verification request." });
    }

    // Process uploaded images
    const imageUrls = images?.map(file => file.path) || [];

    const verificationRequest = new AdminVerification({
      user: userId,
      websiteUrl: websiteUrl || undefined,
      images: imageUrls, // Changed from 'image' to 'images'
    });

    await verificationRequest.save();

     await User.findByIdAndUpdate(userId, {
      adminVerified: "pending",
     
    });

    res.status(201).json({ 
      message: "Verification request created successfully.", 
      verificationRequest 
    });
  } catch (error) {
    console.error("Error creating verification request:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createVerificationRequest,
};
