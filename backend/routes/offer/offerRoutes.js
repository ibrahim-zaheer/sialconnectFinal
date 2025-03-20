const express = require("express");
const router = express.Router();
const {
  createOffer,
  acceptOffer,
  rejectOffer,
  counterOffer,
  getOffersBySupplier,
  acceptCounterOffer,getOffersByExporter,updateOffer
} = require("../../controllers/offers/offer_controller.js");

const authenticateMiddleware = require("../../middleware/authMiddleware.js");

// Route to create an offer (Exporter sends an offer)
router.post("/create", authenticateMiddleware, createOffer);
//ROute to find offers of the exporter
router.get("/exporter", authenticateMiddleware, getOffersByExporter); 

//ROute to find offers of the exporter
router.get("/supplier", authenticateMiddleware, getOffersBySupplier); 

// Route to accept an offer (Supplier accepts the exporter's offer)
router.put("/accept/:offerId", authenticateMiddleware, acceptOffer);

// Route to reject an offer (Supplier rejects the offer)
router.put("/reject/:offerId", authenticateMiddleware, rejectOffer);

router.put("/update/:offerId", authenticateMiddleware, updateOffer); // ✅ Route for updating an offer

// Route to send a counteroffer (Supplier modifies offer)
router.put("/counter/:offerId", authenticateMiddleware, counterOffer);

// Route to accept a counteroffer (Exporter accepts supplier's counter offer)
router.put("/accept-counter/:offerId", authenticateMiddleware, acceptCounterOffer);

module.exports = router;
