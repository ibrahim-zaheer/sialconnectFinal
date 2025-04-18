const express = require("express");
const router = express.Router();
const {
  getOrdersBySupplier,getOrdersByExporter,approveSample,rejectSample,confirmSampleReceipt,initiateTokenPayment,markSampleSent,getOrderDetailsForSupplier,getOrderDetailsForExporter
  
} = require("../../controllers/order/order_controller");

const {uploadSampleImage } = require("../../config/multerConfig");


const authenticateMiddleware = require("../../middleware/authMiddleware");

// ✅ Protected route to get orders for supplier
router.get("/orders/supplier", authenticateMiddleware, getOrdersBySupplier);
router.get("/orders/exporter", authenticateMiddleware, getOrdersByExporter);
router.get("/orders/supplier/:orderId", authenticateMiddleware, getOrderDetailsForSupplier);
router.get("/orders/exporter/:orderId", authenticateMiddleware, getOrderDetailsForExporter);

router.post('/orders/approveSample',approveSample);
router.post('/orders/rejectSample', rejectSample);

// ✅ Exporter initiates token payment (escrow hold)
router.post("/orders/initiate-token-payment", authenticateMiddleware, initiateTokenPayment);

// ✅ Supplier marks sample as sent
router.post("/orders/mark-sample-sent",authenticateMiddleware,uploadSampleImage.single('sampleImage'),markSampleSent);

// ✅ Exporter confirms sample receipt
router.post("/orders/confirm-sample-receipt" ,authenticateMiddleware,uploadSampleImage.single('sampleImage'),confirmSampleReceipt);



module.exports = router;