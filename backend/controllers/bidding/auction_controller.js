const { Auction } = require("../../models/bidding/auctionSchema");
const { uploadAuctionImage } = require("../../config/multerConfig");
const cloudinary = require("../../config/cloudinaryConfig");

const createAuction = async (req, res) => {
    try {
        console.log("Request body:", req.body);  // Log request data
        console.log("Request file:", req.file);  // Log uploaded file if any
        
        const { title, description, startingBid, category, startTime, endTime } = req.body;

        if (!title || !description || !startingBid || !category || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields (title, description, startingBid, category, startTime, endTime) are required." });
        }

        // If there is an image, upload it to Cloudinary
        let image = {};
        if (req.file) {
            image = {
                public_id: req.file.filename,
                url: req.file.path,
            };
        }

        const auction = new Auction({
            title,
            description,
            startingBid,
            category,
            startTime,
            endTime,
            createdBy: req.user.id,
            image,
        });

        await auction.save();
        res.status(201).json({ message: "Auction created successfully", auction });
    } catch (error) {
        console.error("Error creating auction:", error);
        res.status(500).json({ message: error.message });
    }
};

const getAuctionsByExporter = async (req, res) => {
    try {
        if (req.user.role !== "exporter") {
            return res.status(403).json({ message: "Only exporters can view their products." });
        }

        const auctions = await Auction.find({ exporter: req.user.id });

        if (auctions.length === 0) {
            return res.status(404).json({ message: "No auctions found for this exporter." });
        }

        res.status(200).json({ auctions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAuctions = async (req, res) => {
    try {
        const auction = await Auction.find();
        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createAuction,getAllAuctions,getAuctionsByExporter };
