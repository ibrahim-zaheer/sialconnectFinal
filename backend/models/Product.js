const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the Supplier
    image:{type: String,default:"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
