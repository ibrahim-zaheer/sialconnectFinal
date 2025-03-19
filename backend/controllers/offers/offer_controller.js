const Offer = require("../../models/offer/offerSchema");

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
  
      res.json({ message: "Offer accepted. Order created!", offer });
    } catch (error) {
      res.status(500).json({ message: "Error accepting offer", error });
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
      const { price, quantity } = req.body;
      const offer = await Offer.findById(req.params.offerId);
      
      if (!offer) {
        return res.status(404).json({ message: "Offer not found." });
      }
  
      // Only supplier can send counteroffer
      if (req.user.id !== offer.supplierId.toString()) {
        return res.status(403).json({ message: "Unauthorized action." });
      }
  
      offer.status = "counter";
      offer.counterOffer = { price, quantity };
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
  

  module.exports =  { createOffer,
    acceptOffer,
    rejectOffer,
    counterOffer,
    acceptCounterOffer};