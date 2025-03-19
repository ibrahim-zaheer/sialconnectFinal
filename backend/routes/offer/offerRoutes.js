const express = require("express");
const router = express.Router();
const {
  createOffer,
  acceptOffer,
  rejectOffer,
  counterOffer,
  acceptCounterOffer,
} = require("../../controllers/offers/offer_controller.js");

const authenticateMiddleware = require("../../middleware/authMiddleware.js");

// Route to create an offer (Exporter sends an offer)
router.post("/create", authenticateMiddleware, createOffer);

// Route to accept an offer (Supplier accepts the exporter's offer)
router.put("/accept/:offerId", authenticateMiddleware, acceptOffer);

// Route to reject an offer (Supplier rejects the offer)
router.put("/reject/:offerId", authenticateMiddleware, rejectOffer);

// Route to send a counteroffer (Supplier modifies offer)
router.put("/counter/:offerId", authenticateMiddleware, counterOffer);

// Route to accept a counteroffer (Exporter accepts supplier's counter offer)
router.put("/accept-counter/:offerId", authenticateMiddleware, acceptCounterOffer);

module.exports = router;
