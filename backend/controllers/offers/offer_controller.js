const Offer = require("../../models/offer/offerSchema");
const Order = require("../../models/offer/orderSchema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const User = require("../../models/user");

const crypto = require('crypto');

const nodemailer = require('nodemailer');

const createOffer = async (req, res) => {
    try {
      const { supplierId, productId, price, quantity,message,deliveryDays } = req.body;
  
      if (!supplierId || !productId || !price || !quantity || !deliveryDays) {
        return res.status(400).json({ message: "All fields are required." });
      }

      
    if (deliveryDays < 1 || deliveryDays > 100) {
      return res.status(400).json({ message: "Delivery days must be between 1 and 100." });
    }
  
      const newOffer = new Offer({
        exporterId: req.user.id, // Extracted from authentication token
        supplierId,
        productId,
        price,
        quantity,
        message,
        deliveryDays,
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
      const { price, quantity, message, deliveryDays } = req.body;
  
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
   
  
          // ✅ Ensure deliveryDays is within the range
    // if (deliveryDays && (deliveryDays < 1 || deliveryDays > 100)) {
    //   return res.status(400).json({ message: "Delivery days must be between 1 and 100." });
    // }
   if (deliveryDays && isNaN(new Date(deliveryDays).getTime())) {
      return res.status(400).json({ message: "Invalid delivery date." });
    }

      offer.history.push({
        price: offer.price,
        quantity: offer.quantity,
        message: offer.message,
         deliveryDays: offer.deliveryDays,
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
       if (deliveryDays !== undefined) offer.deliveryDays = deliveryDays;
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
       deliveryDays: offer.deliveryDays, 
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
      const { price, quantity, message, deliveryDays } = req.body;
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
      deliveryDays: offer.deliveryDays,
      updatedBy: req.user.id,
      timestamp: new Date()
    });
      offer.status = "counter";
      offer.counterOffer = { price, quantity, message , deliveryDays};
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
       offer.deliveryDays = offer.counterOffer.deliveryDays;
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
          .populate("supplierId", "name email") // Fetch supplier name
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


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// const checkAndSendReminders = async () => {
//   try {
//     const now = new Date();
//     const pendingOffers = await Offer.find({
//       status: "pending",
//       reminderActive: true,
//       $or: [{ nextReminderAt: { $lte: now } }, { nextReminderAt: { $exists: false } }],
//       remindersSent: { $lt: 3 },
//     }).populate("supplierId").populate("productId").populate("exporterId");

//     for (const offer of pendingOffers) {
//       await sendReminderEmail(offer);

//       offer.remindersSent += 1;
//       offer.lastReminderSentAt = new Date();
//       offer.nextReminderAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours later
//       // offer.nextReminderAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute from now


//       if (offer.remindersSent >= 3) {
//         offer.reminderActive = false;
//       }

//       await offer.save();
//     }
//   } catch (error) {
//     console.error("Error in checkAndSendReminders:", error);
//   }
// };

const checkAndSendReminders = async () => {
  try {
    const now = new Date();
    console.log(`[Cron] Running at ${now}`); // Debug log

    const pendingOffers = await Offer.find({
      status: "pending",
      reminderActive: true,
      $or: [
        { nextReminderAt: { $lte: now } },
        { nextReminderAt: { $exists: false } }
      ],
      remindersSent: { $lt: 3 },
    }).populate("supplierId").populate("productId").populate("exporterId");

    console.log(`Found ${pendingOffers.length} offers to process`); // Debug log

    for (const offer of pendingOffers) {
      // Validate dates before processing
      if (offer.nextReminderAt && isNaN(new Date(offer.nextReminderAt).getTime())) {
        console.error(`Invalid nextReminderAt for offer ${offer._id}`);
        continue;
      }

      await sendReminderEmail(offer);

      offer.remindersSent += 1;
      offer.lastReminderSentAt = new Date();
      
      // Ensure the new date is valid
      const nextReminder = new Date();
      nextReminder.setHours(nextReminder.getHours() + 8);
      offer.nextReminderAt = nextReminder;

      if (offer.remindersSent >= 3) {
        offer.reminderActive = false;
      }

      await offer.save();
    }
  } catch (error) {
    console.error("Error in checkAndSendReminders:", error);
  }
};
const sendReminderEmail = async (offer) => {
  try {
    if (!offer.supplierId?.email) {
      console.log(`No email for supplier in offer ${offer._id}`);
      return;
    }

    const mailOptions = {
      from: `"TradeConnect Reminder" <${process.env.EMAIL_USER}>`,
      to: offer.supplierId.email,
      subject: `Reminder: Pending Offer for ${offer.productId?.name || "Product"}`,
      text: `Dear Supplier,

This is reminder ${offer.remindersSent + 1} of 3 regarding your pending offer from ${offer.exporterId?.name || "an exporter"}.

Product: ${offer.productId?.name || "N/A"}
Price: ${offer.price} Rs
Quantity: ${offer.quantity}
Total: ${offer.price * offer.quantity} Rs

Please respond at your earliest convenience.

Thank you,
Sialconnect Team
`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent for offer ${offer._id} to ${offer.supplierId.email}`);
  } catch (error) {
    console.error(`Failed to send reminder for offer ${offer._id}:`, error);
  }
};

const activateReminders = async (offerId) => {
  try {
    const offer = await Offer.findById(offerId);
    if (!offer) throw new Error("Offer not found");

    offer.reminderActive = true;
    offer.nextReminderAt = new Date();
    offer.remindersSent = 0; // reset reminders count on activation if you want
    await offer.save();

    return offer;
  } catch (error) {
    console.error("Error activating reminders:", error);
    throw error;
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
    checkAndSendReminders,
    activateReminders
  };