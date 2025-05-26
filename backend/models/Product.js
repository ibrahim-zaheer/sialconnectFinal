const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the Supplier
  // image: {
  //   type: String,
  //   default:
  //     "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
  // },
  // models/Product.js
image: {
  type: [String],
  default: [
    "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
  ],
},
category: {
  type: String,
  required: true,
  enum: [
    "Industrial Machinery",
    "Construction Materials",
    "Textiles & Fabrics",
    "Chemicals",
    "Metals & Minerals",
    "Agricultural Equipment",
    "Medical Equipment",
    "Electrical Components",
    "Automotive Parts",
    "Renewable Energy Products",
    "Furniture",
    "Plastic Products",
    "Leather Goods",
    "Handicrafts",
    "Packaging Materials",
    "Wood & Timber",
    "Ceramics & Sanitaryware",
    "Glass Products",
    "Defense Equipment",
    "Aerospace Components",
    "Other"
  ],
  default: "Other",
},


  createdAt: { type: Date, default: Date.now },
   discounts: [
    {
      minQuantity: { type: Number, required: false },
      discountedPrice: { type: Number, required: false },
    }
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
