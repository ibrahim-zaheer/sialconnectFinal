// const Bid = require("../../models/bidding/bidSchema");
// const { Auction } = require("../../models/bidding/auctionSchema");
// const User = require("../../models/User");

// const placeBid = async (req, res) => {
//   try {
//     const { auctionId, amount } = req.body;
//     const userId = req.user.id;

//     // Check if auction exists
//     const auction = await Auction.findById(auctionId);
//     if (!auction) {
//       return res.status(404).json({ message: "Auction not found." });
//     }

//     // Check if auction is still active
//     const currentTime = new Date();
//     if (currentTime > new Date(auction.endTime)) {
//       return res.status(400).json({ message: "Auction has already ended." });
//     }

//     // Ensure bid is higher than current highest bid
//     if (amount <= auction.currentBid) {
//       return res.status(400).json({ message: "Your bid must be higher than the current bid." });
//     }
//     // Check if the user has already placed a bid on this auction
//     const existingBid = auction.bids.find((bid) => bid.userId.toString() === userId);
//     if (existingBid) {
//       return res.status(400).json({ message: "You have already placed a bid on this auction." });
//     }

//     // Get user info
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Create new bid
//     const newBid = new Bid({
//       amount,
//       bidder: {
//         id: userId,
//         name: user.name,
//         profilePicture: user.profilePicture,
//       },
//       auctionItem: auctionId,
//     });

//     await newBid.save();

//     // Update auction with the new highest bid
//     auction.currentBid = amount;
//     auction.highestBidder = userId;
//     auction.bids.push({
//       userId: newBid._id,
//       userName: user.name,
//       profileImage: user.profilePicture,
//       amount,
//     });

//     await auction.save();

//     res.status(201).json({ message: "Bid placed successfully!", bid: newBid });
//   } catch (error) {
//     console.error("Error placing bid:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { placeBid };












const Bid = require("../../models/bidding/bidSchema");
const { Auction } = require("../../models/bidding/auctionSchema");
const Order = require("../../models/offer/orderSchema");
const User = require("../../models/User");

const Notification = require("../../models/notification/notificationSchema")
const admin = require("../../utils/firebaseAdmin")

const placeBid = async (req, res) => {
  try {
    const { auctionId, amount } = req.body;
    const userId = req.user.id;

    // Check if auction exists
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found." });
    }

    // Check if auction is still active
    const currentTime = new Date();
    if (currentTime > new Date(auction.endTime)) {
      return res.status(400).json({ message: "Auction has already ended." });
    }

    // Check if the user has already placed a bid on this auction
    // const existingBid = auction.bids.find((bid) => bid.userId.toString() === userId);
    const existingBid = await Bid.findOne({
      auctionItem: auctionId,
      "bidder.id": userId,
    });
    
    if (existingBid) {
      return res.status(400).json({ message: "You have already placed a bid on this auction." });
    }

    // // Ensure bid is higher than current highest bid
    // if (amount <= auction.currentBid) {
    //   return res.status(400).json({ message: "Your bid must be higher than the current bid." });
    // }

    // Get user info
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create new bid
    const newBid = new Bid({
      amount,
      bidder: {
        id: userId,
        name: user.name,
        profilePicture: user.profilePicture,
      },
      auctionItem: auctionId,
    });

    await newBid.save();

    // Update auction with the new highest bid
    auction.currentBid = amount;
    auction.highestBidder = userId;
    // auction.bids.push({
    //   userId: userId, // Use userId instead of newBid._id
    //   userName: user.name,
    //   profileImage: user.profilePicture,
    //   amount,

    //   bidId: newBid._id  
    // });
    auction.bids.push(newBid._id); // Store only Bid ObjectId


    await auction.save();

    // Step 1: Find the FCM token of the auction creator (createdBy)
    const auctionCreator = await User.findById(auction.createdBy);

    
    // Step 2: If the auction creator exists and has an FCM token, send a notification
    if (auctionCreator && auctionCreator.fcmToken) {
      const notification = new Notification({
        userId: auctionCreator._id,
        message: `${user.name} has placed a bid of ${amount} on your auction: ${auction.title}`,
      });

      await notification.save();
      console.log("notification created successfully");

      const message = {
        notification: {
          title: "New Bid Placed",
          body: `${user.name} has placed a bid of ${amount} on your auction: ${auction.title}`,
        },
        token: auctionCreator.fcmToken, // Send the notification to the auction creator's FCM token
      };

      await admin.messaging().send(message); // Send the notification to FCM
    }

    res.status(201).json({ message: "Bid placed successfully!", bid: newBid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async(req,res)=>{
  try {
    const { userId } = req.params;

    // Fetch the user details from the database
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


const acceptBidAndCreateOrder = async (req, res) => {
  try {
    const { auctionId, bidId } = req.body;
    const userId = req.user.id;

    const auction = await Auction.findById(auctionId);

    // const realBids = await Bid.find({ auctionItem: auctionId });

    const bid = await Bid.findById(bidId);

    console.log("Received auctionId:", auctionId);
console.log("Received bidId:", bidId);

    if (!auction ) {
      return res.status(404).json({ message: "Auction not found." });
    }
    if (!bid ) {
      return res.status(404).json({ message: " bid not found." });
    }

    if (auction.isClosed) {
      return res.status(400).json({ message: "This auction has already been closed." });
    }

    if (auction.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to accept a bid on this auction." });
    }

    // Update auction
    auction.acceptedBid = bidId;
    auction.isClosed = true;
    await auction.save();

    // Update bid status
    bid.status = "accepted";
    await bid.save();

    // Reject all other bids
    await Bid.updateMany(
      { auctionItem: auctionId, _id: { $ne: bidId } },
      { $set: { status: "rejected" } }
    );

    // Create Order from accepted bid
    const order = await Order.create({
      auctionId: auction._id,
      exporterId: auction.createdBy,
      supplierId: bid.bidder.id,
      price: bid.amount,
      quantity: auction.quantity,
      message: auction.description,
    });

    return res.status(201).json({
      message: "Bid accepted and order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Error accepting bid:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = { placeBid, getUserDetails,acceptBidAndCreateOrder };
