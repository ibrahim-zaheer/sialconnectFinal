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
const User = require("../../models/User");

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
    const existingBid = auction.bids.find((bid) => bid.userId.toString() === userId);
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
    auction.bids.push({
      userId: userId, // Use userId instead of newBid._id
      userName: user.name,
      profileImage: user.profilePicture,
      amount,
    });

    await auction.save();

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


module.exports = { placeBid, getUserDetails };
