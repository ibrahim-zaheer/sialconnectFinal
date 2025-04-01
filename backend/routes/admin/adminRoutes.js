const express = require("express");
const router = express.Router();

const isAdmin = require("../../middleware/isAdmin");

const verifyToken = require("../../middleware/verifyToken")

const authMiddleware = require("../../middleware/authMiddleware");

const {getAllUsers,suspendUser,reactivateUser,toggleUserStatus,getProductsBySupplierId,getOrdersByExporterId} = require("../../controllers/admin/adminController");


// Admin-only route example
router.get("/users",verifyToken, isAdmin,getAllUsers);

router.put("/suspend/:id", verifyToken, isAdmin, suspendUser);
router.put("/reactivate/:id", verifyToken, isAdmin, reactivateUser);

router.put("/toggle-status/:id", verifyToken, isAdmin, toggleUserStatus);

router.get("/products/supplier/:supplierId",verifyToken,isAdmin,getProductsBySupplierId);

router.get("/orders/exporter/:exporterId",verifyToken,isAdmin,getOrdersByExporterId);

module.exports = router;