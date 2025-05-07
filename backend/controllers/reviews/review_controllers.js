const express = require("express");
const Review = require("../../models/reviewAndRating/Review");
const User = require("../../models/User"); // Import User model
const Notification = require("../../models/notification/notificationSchema")
const admin = require("../../utils/firebaseAdmin")
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


const submitReviewAndNotify = async (req, res) => {
  try {
      const { supplierId, productName, rating, reviewText, orderId, reviewerRole } = req.body;

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
      // const reviewedUserId = reviewerRole === "exporter" ? req.user._id : supplierId;  // If reviewer is the exporter, supplier is the reviewed user.
    //   const reviewedUserId = reviewerRole === "exporter" ? supplierId : req.user._id;
       const reviewedUserId = supplierId;

      if (reviewerRole ==="exporter"){
      console.log("supplier id is: "+supplierId);
      console.log("exporter id is: "+req.user._id);}
      else if(reviewerRole === "supplier"){
        console.log("exporter id is: "+supplierId);
      console.log("supplier(user id) id is: "+req.user._id);
      }


      // Step 1: Save the review
      const review = new Review({
          user: req.user._id, // The user who is writing the review
          reviewerRole, // The role of the reviewer (supplier/exporter)
          reviewedUser: reviewedUserId, // The user being reviewed (exporter or supplier)
          orderId, // Reference to the order
          productName,
          rating: Number(rating),
          reviewText,
      });

      await review.save();

      // Step 2: Find the FCM token of the reviewed user (either supplier or exporter)
      const reviewedUser = await User.findById(reviewedUserId);
      const reviewer = await User.findById(req.user._id);

      // Step 3: If the reviewed user has an FCM token, send a notification
      if (reviewedUser && reviewedUser.fcmToken) {
          const notification = new Notification({
              userId: reviewedUserId,
              message: `${reviewer.name} has reviewed your product: ${reviewText}`,
          });

          await notification.save();

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

// Export the functions for routes
module.exports =  { WriteReview, getAllReviews, getReviewsBySupplier, getReviewsByExporter,submitReviewAndNotify,checkReviewExists };
