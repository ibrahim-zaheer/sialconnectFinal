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

    console.log("images", imageUrls);

    const verificationRequest = new AdminVerification({
      user: userId,
      websiteUrl: websiteUrl || undefined,
      image: imageUrls, // Changed from 'image' to 'images'
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

// const getUserVerificationStatus = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Fetch the user's adminVerified status
//     const user = await User.findById(userId).select('adminVerified');
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Use user's adminVerified status to filter verifications
//     const statusFilter = user.adminVerified || "pending"; // fallback if null

//     // Find AdminVerification requests for this user with status = user's adminVerified
//     const verifications = await AdminVerification.find({
//       user: userId,
//       status: statusFilter
//     }).populate('user', 'name email role adminVerified'); // populate selected user fields

//     res.status(200).json(verifications);
//   } catch (error) {
//     console.error("Error fetching user verification requests:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

const getUserVerificationStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch the user's adminVerified status
    const user = await User.findById(userId).select('adminVerified');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find all AdminVerification requests for this user
    const verifications = await AdminVerification.find({
      user: userId
    }).populate('user', 'name email role adminVerified');

    // Find the most recent verification request (including rejected ones)
    const latestVerification = verifications[verifications.length - 1];

    res.status(200).json({
      adminVerified: user.adminVerified,
      rejectionReason: latestVerification?.status === 'rejected' ? latestVerification.rejectionReason : null
    });
  } catch (error) {
    console.error("Error fetching user verification requests:", error);
    res.status(500).json({ message: "Server error." });
  }
};


// const getAllAdminVerifications = async (req, res) => {
//   try {
//     const verifications = await AdminVerification.find().populate('user');
//     res.status(200).json(verifications);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch admin verifications', error: error.message });
//   }
// };


const getAllAdminVerifications = async (req, res) => {
  try {
    const verifications = await AdminVerification.find()
      .populate({
        path: 'user',
        select: 'name email role businessName businessAddress phoneNumber cnic profilePicture adminVerified', // Only pull needed fields
      });

    // Transform data to include business info (optional)
    const formattedVerifications = verifications.map(verification => ({
      ...verification.toObject(),
      businessInfo: {
        name: verification.user.businessName,
        address: verification.user.businessAddress,
        phone: verification.user.phoneNumber,
        cnic: verification.user.cnic, // For identity verification
        profilePicture: verification.user.profilePicture, // Optional: Show user's profile
      },
    }));

    res.status(200).json(formattedVerifications);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch admin verifications', 
      error: error.message 
    });
  }
};

const approveVerificationRequest = async (req, res) => {
  try {
    const verificationId = req.params.id; // ID of the AdminVerification document to approve

    // Find the verification request by ID
    const verificationRequest = await AdminVerification.findById(verificationId);
    if (!verificationRequest) {
      return res.status(404).json({ message: "Verification request not found." });
    }

    // Update the status to 'approved' and set reviewedAt
    verificationRequest.status = "approved";
    verificationRequest.reviewedAt = new Date();
    await verificationRequest.save();

    // Update the corresponding user's adminVerified field to 'approved'
    await User.findByIdAndUpdate(verificationRequest.user, { adminVerified: "approved" });

    res.status(200).json({
      message: "Verification request approved successfully.",
      verificationRequest,
    });
  } catch (error) {
    console.error("Error approving verification request:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const rejectVerificationRequest = async (req, res) => {
  try {
    const verificationId = req.params.id; // ID of the AdminVerification document to reject
    const { rejectionReason } = req.body;

    // Find the verification request by ID
    const verificationRequest = await AdminVerification.findById(verificationId);
    if (!verificationRequest) {
      return res.status(404).json({ message: "Verification request not found." });
    }

    // Update status to 'rejected', save rejectionReason, and set reviewedAt
    verificationRequest.status = "rejected";
    verificationRequest.rejectionReason = rejectionReason || "No reason provided";
    verificationRequest.reviewedAt = new Date();
    await verificationRequest.save();

    // Update the user's adminVerified status to 'rejected'
    await User.findByIdAndUpdate(verificationRequest.user, { adminVerified: "rejected" });

    res.status(200).json({
      message: "Verification request rejected successfully.",
      verificationRequest,
    });
  } catch (error) {
    console.error("Error rejecting verification request:", error);
    res.status(500).json({ message: "Server error." });
  }
};


module.exports = {
  createVerificationRequest,getAllAdminVerifications,approveVerificationRequest,getUserVerificationStatus,rejectVerificationRequest
};
