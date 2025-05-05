const express = require("express");

const  authenticateMiddleware = require("../../middleware/authMiddleware");

const  isAuthorized = require("../../middleware/isAuthorized");

const {WriteReview,getAllReviews,getReviewsBySupplier,submitReviewAndNotify,checkReviewExists} = require("../../controllers/reviews/review_controllers")

const router = express.Router();

//write reviews by the user

router.post("/",authenticateMiddleware,submitReviewAndNotify)


// Get all reviews (Public)
router.get("/",getAllReviews);

// Get reviews by supplier email (Public)
router.get("/supplier/:supplierId",getReviewsBySupplier);

router.get('/check/:orderId', authenticateMiddleware,checkReviewExists);


module.exports = router;

