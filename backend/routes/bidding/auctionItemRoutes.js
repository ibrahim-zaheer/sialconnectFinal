
// const {createAuction,getAllAuctions,getAuctionsByExporter,getAuctionDetails,getMyAuctions,deleteAuction} = require("../../controllers/bidding/auction_controller")
// const authenticateMiddleware= require("../../middleware/authMiddleware")
// const {uploadProductImage} = require("../../config/multerConfig")

// const biddingRoutes = require("./biddingRoutes")

// const express = require("express");
// const router = express.Router();


// router.post("/create", authenticateMiddleware,uploadProductImage.single("image"), createAuction);
// router.get("/getAuctionsByExporter", authenticateMiddleware, getMyAuctions);
// router.get("/getAllAuctions",getAllAuctions);

// router.get("/:id", getAuctionDetails);


// router.delete("/delete/:id", authenticateMiddleware, deleteAuction);

// router.use("/bid",biddingRoutes)

// // router.get("/read", authenticateMiddleware, getAuctionsByExporter);


// // router.get("/my-auctions", authenticateMiddleware,getMyAuctions);



// module.exports = router;



const express = require("express");
const { createAuction, getAllAuctions, getAuctionsByExporter, getAuctionDetails, getMyAuctions, deleteAuction } = require("../../controllers/bidding/auction_controller");
const { placeBid,getUserDetails } = require("../../controllers/bidding/bid_controller");
const  authenticateMiddleware = require("../../middleware/authMiddleware");

const  isAuthorized = require("../../middleware/isAuthorized");
const { uploadProductImage } = require("../../config/multerConfig");


const router = express.Router();

// Auction Routes
// router.post("/create", authenticateMiddleware, uploadProductImage.single("image"), createAuction);
router.post("/create", authenticateMiddleware, uploadProductImage.array("images", 3), createAuction);

router.get("/getAuctionsByExporter", authenticateMiddleware, getMyAuctions);
router.get("/getAllAuctions", getAllAuctions);
router.get("/:id", getAuctionDetails);
router.delete("/delete/:id", authenticateMiddleware, deleteAuction);

// Use Bidding Routes (Correct Placement)
router.post("/place/:id", authenticateMiddleware, isAuthorized("supplier"), placeBid);
//for getting user details
router.get("/user-details/:userId", getUserDetails);

module.exports = router;
