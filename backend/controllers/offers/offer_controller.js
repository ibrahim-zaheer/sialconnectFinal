const Offer = require("../../models/offer/offerSchema");
const Order = require("../../models/offer/orderSchema");

const createOffer = async (req, res) => {
    try {
      const { supplierId, productId, price, quantity,message } = req.body;
  
      if (!supplierId || !productId || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const newOffer = new Offer({
        exporterId: req.user.id, // Extracted from authentication token
        supplierId,
        productId,
        price,
        quantity,
        message,
        status: "pending",
      });
  
      await newOffer.save();
      res.status(201).json({ message: "Offer sent successfully", offer: newOffer });
    } catch (error) {
      res.status(500).json({ message: "Error sending offer", error });
    }
  };

  const updateOffer = async (req, res) => {
    try {
      const { offerId } = req.params; // Extract Offer ID from URL
      const { price, quantity, message } = req.body;
  
      // ✅ Find offer by ID
      const offer = await Offer.findById(offerId);
  
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
  
      // ✅ Ensure only the exporter who created the offer can update it
      if (offer.exporterId.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to update this offer" });
      }
         // ✅ Check if counter offer limit is reached
   
  

      offer.history.push({
        price: offer.price,
        quantity: offer.quantity,
        message: offer.message,
        updatedBy: req.user.id,
        timestamp: new Date()
      });
      offer.updateCount = (offer.updateCount || 0) + 1;

      if (offer.updateCount >= 2) {
        return res.status(400).json({ message: "Update limit reached." });
      }
      
  
      // ✅ Update offer details (only if provided)
      if (price !== undefined) offer.price = price;
      if (quantity !== undefined) offer.quantity = quantity;
      if (message !== undefined) offer.message = message;
      offer.isUpdated = true;
      offer.counterOfferCount += 1; 
      await offer.save();
  
      res.status(200).json({ message: "Offer updated successfully", offer });
    } catch (error) {
      res.status(500).json({ message: "Error updating offer", error });
    }
  };
  
const acceptOffer = async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found." });
      }
      
  
      // Only supplier can accept
      if (req.user.id !== offer.supplierId.toString()) {
        return res.status(403).json({ message: "Unauthorized action." });
      }
  
      offer.status = "accepted";
      offer.acceptedBy = req.user.id;
      await offer.save();

         // ✅ Create an order from the accepted offer
    const newOrder = new Order({
      offerId: offer._id,
      exporterId: offer.exporterId,
      supplierId: offer.supplierId,
      productId: offer.productId,
      price: offer.price,
      quantity: offer.quantity,
      message: offer.message,
    });

    await newOrder.save();

    // ✅ ✅ Only this response should remain
    return res.status(200).json({ message: "Offer accepted and order created!", order: newOrder });
    } catch (error) {
      res.status(500).json({ message: "Error accepting offer", error });
      console.log(error);
    }
  };


  const rejectOffer =  async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.offerId);
      if (!offer) {
        return res.status(404).json({ message: "Offer not found." });
      }
  
      // Only supplier can reject
      if (req.user.id !== offer.supplierId.toString()) {
        return res.status(403).json({ message: "Unauthorized action." });
      }
  
      offer.status = "rejected";
      await offer.save();
  
      res.json({ message: "Offer rejected.", offer });
    } catch (error) {
      res.status(500).json({ message: "Error rejecting offer", error });
    }
  };

  const counterOffer = async (req, res) => {
    try {
      const { price, quantity, message } = req.body;
      const offer = await Offer.findById(req.params.offerId);
      
      if (!offer) {
        return res.status(404).json({ message: "Offer not found." });
      }

      // ✅ Check if counter offer limit is reached
    if (offer.counterOfferCount >= 2) {
      return res.status(400).json({ success: false, message: "Counteroffer limit reached. You can't send more than 2 counteroffers." });
    }
  
      // Only supplier can send counteroffer
      if (req.user.id !== offer.supplierId.toString()) {
        return res.status(403).json({ message: "Unauthorized action." });
      }
     // ✅ Save snapshot before changing
     offer.history.push({
      price: offer.price,
      quantity: offer.quantity,
      message: offer.message,
      updatedBy: req.user.id,
      timestamp: new Date()
    });
      offer.status = "counter";
      offer.counterOffer = { price, quantity, message };
      offer.counterOfferCount += 1; 
      await offer.save();
  
      res.json({ message: "Counter offer sent.", offer });
    } catch (error) {
      res.status(500).json({ message: "Error sending counter offer", error });
    }
  };
  
  const acceptCounterOffer = async (req, res) => {
    try {
      const offer = await Offer.findById(req.params.offerId);
      
      if (!offer) {
        return res.status(404).json({ message: "Offer not found." });
      }
  
      // Only exporter can accept the counter offer
      if (req.user.id !== offer.exporterId.toString()) {
        return res.status(403).json({ message: "Unauthorized action." });
      }
  
      offer.price = offer.counterOffer.price;
      offer.quantity = offer.counterOffer.quantity;
      offer.status = "accepted";
      offer.acceptedBy = req.user.id;
      await offer.save();
  
      res.json({ message: "Counter offer accepted. Order created!", offer });
    } catch (error) {
      res.status(500).json({ message: "Error accepting counter offer", error });
    }
  };

//   const getOffersByExporter = async (req, res) => {
//     try {
//         const offers = await Offer.find({ exporterId: req.user.id });

//         if (!offers.length) {
//             return res.status(404).json({ message: "No offers found for this user." });
//         }

//         res.status(200).json({ message: "Offers retrieved successfully", offers });
//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving offers", error });
//     }
// };

const getOffersByExporter = async (req, res) => {
  try {
      const offers = await Offer.find({ exporterId: req.user.id })
          .populate("productId", "name") // Fetch product name
          .populate("supplierId", "name") // Fetch supplier name
          .populate("history.updatedBy", "name");
      if (!offers.length) {
          return res.status(404).json({ message: "No offers found for this user." });
      }

      res.status(200).json({ message: "Offers retrieved successfully", offers });
  } catch (error) {
      res.status(500).json({ message: "Error retrieving offers", error });
  }
};

const getOffersBySupplier = async (req, res) => {
  try {
      const offers = await Offer.find({ supplierId: req.user.id })
          .populate("productId", "name") // Fetch product name
          .populate("exporterId", "name") // Fetch supplier name
          .populate("history.updatedBy", "name");
      if (!offers.length) {
          return res.status(404).json({ message: "No offers found for this user." });
      }

      res.status(200).json({ message: "Offers retrieved successfully", offers });
  } catch (error) {
      res.status(500).json({ message: "Error retrieving offers", error });
  }
};


  

  module.exports =  { createOffer,
    acceptOffer,
    rejectOffer,
    counterOffer,
    acceptCounterOffer,
    getOffersByExporter,
    getOffersBySupplier,
    updateOffer,
  };