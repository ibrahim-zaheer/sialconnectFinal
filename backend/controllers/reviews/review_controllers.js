const express = require("express");
const Review = require("../../models/reviewAndRating/Review");
const User = require("../../models/User"); // Import User model
const Notification = require("../../models/notification/notificationSchema")
const admin = require("../../utils/firebaseAdmin")
const Order = require("../../models/offer/orderSchema");
// const io = require("../../server")
// const {getReceiverSocketId} = require("../../utils/socketHelper")

// Write a Reviewconst admin = require("../../utils/firebaseAdmin")

// const submitReviewAndNotify = async (req, res) => {
//     try {
//       const { supplierId, productName, rating, reviewText } = req.body;
  
//       // Validate required fields
//       if ( !supplierId || !productName || !rating || !reviewText) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       // Step 1: Save the review
//       const review = new Review({
//         user: req.user._id, // Get user ID from authentication middleware
//         supplier: supplierId, // Reference supplier by ObjectId
//         productName,
//         rating: Number(rating),
//         reviewText,
//       });
  
//       await review.save();
  
//       // Step 2: Find the FCM token of the supplier (User B)
//       const supplier = await User.findById(supplierId);
//       if (!supplier || !supplier.fcmToken) {
//         return res.status(404).json({ message: "Supplier not found or FCM token not available" });
//       }
  
//       // Step 3: Create a notification for the supplier
//       const notification = new Notification({
//         userId: supplierId,
//         message: `User A has reviewed your product: ${reviewText}`,
//       });
//       await notification.save();
  
//       // Step 4: Send the notification to the supplier
//       const message = {
//         notification: {
//           title: "New Product Review",
//           body: `User A has reviewed your product: ${reviewText}`,
//         },
//         token: supplier.fcmToken, // Send the notification to the supplier's FCM token
//       };
  
//       await admin.messaging().send(message);
  
//       // Respond with success
//       res.status(200).json({ message: "Review submitted and notification sent successfully" });
//     } catch (error) {
//       console.error("Error submitting review or sending notification:", error); // Log the error
//       res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
//     }
//   };
  

// const submitReviewAndNotify = async (req, res) => {
//     try {
//       const { supplierId, productName, rating, reviewText } = req.body;
  
//       // Validate required fields
//       if (!supplierId || !productName || !rating || !reviewText) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       // Step 1: Save the review
//       const review = new Review({
//         user: req.user._id, // Get user ID from authentication middleware
//         supplier: supplierId, // Reference supplier by ObjectId
//         productName,
//         rating: Number(rating),
//         reviewText,
//       });
  
//       await review.save(); // Save the review even if FCM token is not available
  
//       // Step 2: Find the FCM token of the supplier (User B)
//       const supplier = await User.findById(supplierId);
//       const userID = await User.findById(req.user._id)
  
//       // Step 3: If the supplier exists but doesn't have an FCM token, skip the notification
//       if (supplier && supplier.fcmToken) {
//         // If supplier has FCM token, create a notification and send it
//         const notification = new Notification({
//           userId: supplierId,
//           message: `${userID.name} has reviewed your product: ${reviewText}`,
//         });
  
//         await notification.save();
  
//         const message = {
//           notification: {
//             title: "New Product Review",
//             body: `${userID.name}  has reviewed your product: ${reviewText}`,
//           },
//           token: supplier.fcmToken, // Send the notification to the supplier's FCM token
//         };
  
//         await admin.messaging().send(message); // Send the notification to FCM
//       }
  
//       // Respond with success, even if notification is skipped
//       res.status(200).json({ message: "Review submitted successfully" });
//     } catch (error) {
//       console.error("Error submitting review or sending notification:", error);
//       res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
//     }
//   };
  

// const submitReviewAndNotify = async (req, res) => {
//   try {
//       const { supplierId, productName, rating, reviewText, orderId, reviewerRole } = req.body;

//       // Validate required fields
//       if (!supplierId || !productName || !rating || !reviewText || !orderId || !reviewerRole) {
//           return res.status(400).json({ message: "All fields are required" });
//       }

//       // Check if the user has already reviewed this order
//       const existingReview = await Review.findOne({ user: req.user._id, orderId });
//       if (existingReview) {
//           return res.status(400).json({ message: "You have already reviewed this order." });
//       }

//       // Determine which user (supplier or exporter) is being reviewed
//       const reviewedUserId = reviewerRole === "supplier" ? supplierId : req.user._id;  // If the reviewer is the exporter, it's their review.

//       // Step 1: Save the review
//       const review = new Review({
//           user: req.user._id, // The user who is writing the review
//           reviewerRole, // The role of the reviewer (supplier/exporter)
//           reviewedUser: reviewedUserId, // The user being reviewed
//           orderId, // Reference to the order
//           productName,
//           rating: Number(rating),
//           reviewText,
//       });

//       await review.save();

//       // Step 2: Find the FCM token of the reviewed user (either supplier or exporter)
//       const reviewedUser = await User.findById(reviewedUserId);
//       const reviewer = await User.findById(req.user._id);

//       // Step 3: If the reviewed user has an FCM token, send a notification
//       if (reviewedUser && reviewedUser.fcmToken) {
//           const notification = new Notification({
//               userId: reviewedUserId,
//               message: `${reviewer.name} has reviewed your product: ${reviewText}`,
//           });

//           await notification.save();

//           const message = {
//               notification: {
//                   title: "New Product Review",
//                   body: `${reviewer.name} has reviewed your product: ${reviewText}`,
//               },
//               token: reviewedUser.fcmToken, // Send the notification to the reviewed user's FCM token
//           };

//           await admin.messaging().send(message); // Send the notification to FCM
//       }

//       // Respond with success
//       res.status(200).json({ message: "Review submitted successfully" });
//   } catch (error) {
//       console.error("Error submitting review or sending notification:", error);
//       res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
//   }
// };


//21 june 2025


let io;
let userSocketMap;
let getReceiverSocketId; // Add this

function initSocket(ioInstance, socketMap, socketIdGetter) {
  io = ioInstance;
  userSocketMap = socketMap;
  getReceiverSocketId = socketIdGetter; // Store the function
}

// const submitReviewAndNotify = async (req, res) => {
//   try {
//       const { supplierId, productName, rating, reviewText, orderId, reviewerRole } = req.body;

//       // Validate required fields
//       if (!supplierId || !productName || !rating || !reviewText || !orderId || !reviewerRole) {
//           return res.status(400).json({ message: "All fields are required" });
//       }

//       // Check if the user has already reviewed this order
//       const existingReview = await Review.findOne({ user: req.user._id, orderId });
//       if (existingReview) {
//           return res.status(400).json({ message: "You have already reviewed this order." });
//       }

//       // Determine who is being reviewed
//       // const reviewedUserId = reviewerRole === "exporter" ? req.user._id : supplierId;  // If reviewer is the exporter, supplier is the reviewed user.
//     //   const reviewedUserId = reviewerRole === "exporter" ? supplierId : req.user._id;
//        const reviewedUserId = supplierId;

//       if (reviewerRole ==="exporter"){
//       console.log("supplier id is: "+supplierId);
//       console.log("exporter id is: "+req.user._id);}
//       else if(reviewerRole === "supplier"){
//         console.log("exporter id is: "+supplierId);
//       console.log("supplier(user id) id is: "+req.user._id);
//       }


//       // Step 1: Save the review
//       const review = new Review({
//           user: req.user._id, // The user who is writing the review
//           reviewerRole, // The role of the reviewer (supplier/exporter)
//           reviewedUser: reviewedUserId, // The user being reviewed (exporter or supplier)
//           orderId, // Reference to the order
//           productName,
//           rating: Number(rating),
//           reviewText,
//       });

//       await review.save();

//       // Step 2: Find the FCM token of the reviewed user (either supplier or exporter)
//       const reviewedUser = await User.findById(reviewedUserId);
//       const reviewer = await User.findById(req.user._id);

//       // Step 3: If the reviewed user has an FCM token, send a notification
//       if (reviewedUser && reviewedUser.fcmToken) {
//           const notification = new Notification({
//               userId: reviewedUserId,
//               message: `${reviewer.name} has reviewed your product: ${reviewText}`,
//           });

//           await notification.save();

//              const receiverSocketId = getReceiverSocketId(reviewedUser);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newNotification", notification);
//     }

//           const message = {
//               notification: {
//                   title: "New Product Review",
//                   body: `${reviewer.name} has reviewed your product: ${reviewText}`,
//               },
//               token: reviewedUser.fcmToken, // Send the notification to the reviewed user's FCM token
//           };

//           await admin.messaging().send(message); // Send the notification to FCM
//       }
    


//       // Respond with success
//       res.status(200).json({ message: "Review submitted successfully" });
//   } catch (error) {
//       console.error("Error submitting review or sending notification:", error);
//       res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
//   }
// };


// const createReview = async (req, res) => {
//   const { user, reviewerRole, reviewedUser, orderId, productName, rating, reviewText } = req.body;
  
//   try {
//     // Create a new review document
//     const review = new Review({
//       user,
//       reviewerRole,
//       reviewedUser,
//       orderId,
//       productName,
//       rating,
//       reviewText,
//     });
    
//     // Save the review to the database
//     await review.save();

//     // Create a notification for the reviewed user
//     const notificationMessage = `${reviewerRole} has written a review for your product ${productName}.`;
//     const notification = new Notification({
//       userId: reviewedUser,
//       message: notificationMessage,
//       actionUrl: `/reviews/${review._id}`, // Optional: link to review details
//     });
//     await notification.save();

//     // Send real-time notification using Socket.IO
//     const receiverSocketId = getReceiverSocketId(reviewedUser);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newNotification", notification);
//     }

//     // Respond with the created review and notification
//     res.status(201).json({ review, notification });
//   } catch (error) {
//     console.error("Error creating review:", error);
//     res.status(500).json({ message: "Error creating review", error: error.message });
//   }
// };


const submitReviewAndNotify = async (req, res) => {
  try {
    const { supplierId, productId,productName, rating, reviewText, orderId, reviewerRole } = req.body;

    // Validate required fields
    if (!supplierId || !productName || !rating || !reviewText || !orderId || !reviewerRole) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user has already reviewed this order
    const existingReview = await Review.findOne({ user: req.user._id, orderId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this order." });
    }

    // Determine who is being reviewed
    const reviewedUserId = supplierId;  // Supplier is always the one being reviewed in this case

    // Step 1: Save the review
    const review = new Review({
      user: req.user._id, // The user who is writing the review
      reviewerRole, // The role of the reviewer (supplier/exporter)
      reviewedUser: reviewedUserId, // The user being reviewed (supplier)
      orderId, // Reference to the order
       productId: productId || undefined,
      productName,
      rating: Number(rating),
      reviewText,
    });

    await review.save();

    // Step 2: Find the FCM token of the reviewed user (supplier)
    const reviewedUser = await User.findById(reviewedUserId);
    const reviewer = await User.findById(req.user._id);

    // Step 3: If the reviewed user has an FCM token, send a notification
    if (reviewedUser && reviewedUser.fcmToken) {
      const notification = new Notification({
        userId: reviewedUserId,
        message: `${reviewer.name} has reviewed your product: ${reviewText}`,
      });

      await notification.save();

      // Real-time notification via Socket.IO
      const receiverSocketId = getReceiverSocketId(reviewedUserId);  // Get socket ID of the reviewed user
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", notification);  // Emit new notification event
      }

      // Send push notification via FCM
      const message = {
        notification: {
          title: "New Product Review",
          body: `${reviewer.name} has reviewed your product: ${reviewText}`,
        },
        token: reviewedUser.fcmToken, // Send the notification to the reviewed user's FCM token
      };

      await admin.messaging().send(message); // Send the notification to FCM
    }

    // Respond with success
    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review or sending notification:", error);
    res.status(500).json({ message: "Error submitting review or sending notification", error: error.message });
  }
};



const WriteReview = async (req, res) => {
    try {
        const { supplierId, productName, rating, reviewText } = req.body;

        // Validate required fields
        if (!supplierId || !productName || !rating || !reviewText) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate if supplier exists and has the correct role
        const supplier = await User.findOne({ _id: supplierId, role: "supplier" });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found or invalid role" });
        }

        // Create a new review
        const newReview = new Review({
            user: req.user._id, // Get user ID from authentication middleware
            supplier: supplierId, // Reference supplier by ObjectId
            productName,
            rating: Number(rating),
            reviewText,
        });

        // Save review to database
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Reviews
// const getAllReviews = async (req, res) => {
//     try {
//         const reviews = await Review.find()
//             .populate("user", "name email profilePicture") // Populate reviewer details
//             .populate("supplier", "name email profilePicture"); // Populate supplier details

//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

const getAllReviews = async (req, res) => {
  try {
      const reviews = await Review.find()
          .populate("user", "name email profilePicture") // Populate reviewer details
          .populate("reviewedUser", "name email profilePicture"); // Correct field to populate

      res.status(200).json(reviews);
  } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Server Error" });
  }
};

// Get Reviews by Supplier
// const getReviewsBySupplier = async (req, res) => {
//     try {
//         const { supplierId } = req.params;

//         // Validate supplierId
//         if (!supplierId) {
//             return res.status(400).json({ message: "Supplier ID is required" });
//         }

//         // Check if supplier exists
//         const supplier = await User.findOne({ _id: supplierId, role: "supplier" });
//         if (!supplier) {
//             return res.status(404).json({ message: "Supplier not found" });
//         }

//         const reviews = await Review.find({ supplier: supplierId })
//             .populate("user", "name email profilePicture"); // Populate reviewer details

//         if (reviews.length === 0) {
//             return res.status(404).json({ message: "No reviews found for this supplier" });
//         }

//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };


const getReviewsBySupplier = async (req, res) => {
  try {
      const { supplierId } = req.params;

      // Validate supplierId
      if (!supplierId) {
          return res.status(400).json({ message: "Supplier ID is required" });
      }

      // Check if supplier exists
      const supplier = await User.findOne({ _id: supplierId, role: "supplier" });
      if (!supplier) {
          return res.status(404).json({ message: "Supplier not found" });
      }

      const reviews = await Review.find({ reviewedUser: supplierId }) // Use `reviewedUser` here
          .populate("user", "name email profilePicture"); // Populate reviewer details

      if (reviews.length === 0) {
          return res.status(404).json({ message: "No reviews found for this supplier" });
      }

      res.status(200).json(reviews);
  } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Server Error" });
  }
};

const getReviewsByExporter = async (req, res) => {
    try {
        const { exporterId } = req.params;
  
        // Validate exporterId
        if (!exporterId) {
            return res.status(400).json({ message: "Exporter ID is required" });
        }
  
        // Check if exporter exists
        const exporter = await User.findOne({ _id: exporterId, role: "exporter" });
        if (!exporter) {
            return res.status(404).json({ message: "Exporter not found" });
        }
  
        // Fetch reviews where the exporter is the reviewedUser
        const reviews = await Review.find({ reviewedUser: exporterId })
            .populate("user", "name email profilePicture") // Populate reviewer details
            .populate("orderId", "productName"); // Optionally populate the order information
  
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this exporter" });
        }
  
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server Error" });
    }
  };
  
// Check if the user has already reviewed the order
const checkReviewExists = async (req, res) => {
  try {
    const { orderId } = req.params; // Get orderId from params

    // Check if a review exists for this orderId and the current user
    const existingReview = await Review.findOne({ 
      user: req.user._id, // Check the review by the logged-in user
      orderId 
    });

    if (existingReview) {
      return res.status(200).json({ reviewExists: true });
    }

    return res.status(200).json({ reviewExists: false });
  } catch (error) {
    console.error("Error checking review:", error);
    res.status(500).json({ message: "Error checking review", error: error.message });
  }
};

// const getReviewsWithProduct = async (req, res) => {
//   try {
//     const reviews = await Review.find()
//       .populate("user", "name email") // optional: show basic user info
//       .populate("reviewedUser", "name email") // optional
//       .populate({
//         path: "orderId",
//         populate: {
//           path: "productId",
//           model: "Product",
//           select: "name description price image category", // limit fields
//         },
//       });

//     res.status(200).json({
//       success: true,
//       count: reviews.length,
//       data: reviews,
//     });
//   } catch (err) {
//     console.error("Error fetching reviews:", err.message);
//     res.status(500).json({
//       success: false,
//       error: "Server Error",
//     });
//   }
// };


// const getReviewsByProductId = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const reviews = await Review.find()
//       .populate({
//         path: "orderId",
//         match: { productId: productId }, // match productId in order
//         populate: {
//           path: "productId",
//           model: "Product",
//           select: "name image price category", // optional
//         },
//       })
//       .populate("user", "name email") // optional: reviewer info
//       .populate("reviewedUser", "name email"); // optional: who was reviewed

//     // Filter out reviews where orderId was not matched
//     const filteredReviews = reviews.filter(r => r.orderId !== null);

//     res.status(200).json({
//       success: true,
//       count: filteredReviews.length,
//       data: filteredReviews,
//     });
//   } catch (err) {
//     console.error("Error fetching reviews by product ID:", err.message);
//     res.status(500).json({
//       success: false,
//       error: "Server error",
//     });
//   }
// };

// const getReviewsByProductId = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     if (!productId) {
//       return res.status(400).json({ message: "Product ID is required." });
//     }

//     const reviews = await Review.find({ productId }) // Only show approved reviews
//       .populate("user", "name email profilePic") // Populating basic reviewer info
//       .sort({ createdAt: -1 }); // Newest first

//     if (reviews.length === 0) {
//       return res.status(404).json({ message: "No reviews found for this product." });
//     }

//     res.status(200).json({ reviews });
//   } catch (error) {
//     console.error("Error fetching reviews by product ID:", error);
//     res.status(500).json({
//       message: "Server error while retrieving reviews.",
//       error: error.message,
//     });
//   }
// };


const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const { reviewerRole } = req.query;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const filter = {
      productId,
      
    };

    if (reviewerRole) {
      filter.reviewerRole = reviewerRole;
    }

    const reviews = await Review.find(filter)
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this product." });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews by product ID:", error);
    res.status(500).json({
      message: "Server error while retrieving reviews.",
      error: error.message,
    });
  }
};

// Export the functions for routes
module.exports =  { WriteReview, getAllReviews, getReviewsBySupplier, getReviewsByExporter,submitReviewAndNotify,checkReviewExists,initSocket ,getReviewsByProductId};
