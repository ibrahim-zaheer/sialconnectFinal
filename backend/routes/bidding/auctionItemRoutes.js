
const {createAuction,getAllAuctions,getAuctionsByExporter} = require("../../controllers/bidding/auction_controller")
const authenticateMiddleware= require("../../middleware/authMiddleware")
const {uploadProductImage} = require("../../config/multerConfig")

const express = require("express");
const router = express.Router();


router.post("/create", authenticateMiddleware,uploadProductImage.single("image"), createAuction);

router.get("/getAllAuctions",getAllAuctions);

router.get("/read", authenticateMiddleware, getAuctionsByExporter);
module.exports = router;
