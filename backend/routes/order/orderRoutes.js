const express = require("express");
const router = express.Router();
const {
  getOrdersBySupplier
} = require("../../controllers/order/order_controller");

const authenticateMiddleware = require("../../middleware/authMiddleware");

// ✅ Protected route to get orders for supplier
router.get("/orders/supplier", authenticateMiddleware, getOrdersBySupplier);

module.exports = router;