// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const productRoutes = require("./products/products");



router.use("/product",productRoutes);
module.exports = router;