const express = require("express");
const router = express.Router();
const {
  getOrdersBySupplier,getOrdersByExporter,approveSample,rejectSample,confirmSampleReceipt,initiateTokenPayment,markSampleSent,getOrderDetailsForSupplier,getOrderDetailsForExporter,acceptAgreement,rejectAgreement,addPaymentDetailsForSupplier,markPaymentAsCompleted,getAllPaymentsForSupplier,initiateLocalPayment
  
} = require("../../controllers/order/order_controller");

const {uploadSampleImage, uploadTransactionProof } = require("../../config/multerConfig");


const authenticateMiddleware = require("../../middleware/authMiddleware");

const isAdmin = require("../../middleware/isAdmin");

const verifyToken = require("../../middleware/verifyToken")

// ✅ Protected route to get orders for supplier
router.get("/orders/supplier", authenticateMiddleware, getOrdersBySupplier);
router.get("/orders/exporter", authenticateMiddleware, getOrdersByExporter);
router.get("/orders/supplier/:orderId", authenticateMiddleware, getOrderDetailsForSupplier);
router.get("/orders/exporter/:orderId", authenticateMiddleware, getOrderDetailsForExporter);

router.post('/orders/approveSample',authenticateMiddleware,approveSample);
router.post('/orders/rejectSample', authenticateMiddleware,rejectSample);

// ✅ Exporter initiates token payment (escrow hold)
router.post("/orders/initiate-token-payment", authenticateMiddleware, initiateTokenPayment);
router.post("/orders/initiate-local-token-payment", authenticateMiddleware, uploadTransactionProof.single('local_transaction_proof'),initiateTokenPayment);


// ✅ Supplier marks sample as sent
router.post("/orders/mark-sample-sent",authenticateMiddleware,uploadSampleImage.single('sampleImage'),markSampleSent);

// ✅ Exporter confirms sample receipt
router.post("/orders/confirm-sample-receipt" ,authenticateMiddleware,uploadSampleImage.single('sampleImage'),confirmSampleReceipt);

// Route for accepting the agreement
router.post("/orders/accept-agreement",authenticateMiddleware,acceptAgreement);

// Route for rejecting the agreement
router.post("/orders/reject-agreement",authenticateMiddleware, rejectAgreement);

// Route for the supplier to add payment details
router.post("/orders/payment-details", authenticateMiddleware,addPaymentDetailsForSupplier);

router.post("/orders/accept-payment",markPaymentAsCompleted);

router.get("/orders/payments",authenticateMiddleware,getAllPaymentsForSupplier);


module.exports = router;