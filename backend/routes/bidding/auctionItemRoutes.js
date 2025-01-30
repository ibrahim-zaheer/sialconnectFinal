
const {createAuction,getAllAuctions,getAuctionsByExporter,getAuctionDetails,getMyAuctions} = require("../../controllers/bidding/auction_controller")
const authenticateMiddleware= require("../../middleware/authMiddleware")
const {uploadProductImage} = require("../../config/multerConfig")

const express = require("express");
const router = express.Router();


router.post("/create", authenticateMiddleware,uploadProductImage.single("image"), createAuction);
router.get("/getAuctionsByExporter", authenticateMiddleware, getMyAuctions);
router.get("/getAllAuctions",getAllAuctions);

router.get("/:id", getAuctionDetails);

// router.get("/read", authenticateMiddleware, getAuctionsByExporter);


// router.get("/my-auctions", authenticateMiddleware,getMyAuctions);

module.exports = router;
