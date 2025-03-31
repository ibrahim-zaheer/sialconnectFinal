const express = require("express");
const router = express.Router();

const isAdmin = require("../../middleware/isAdmin");

const verifyToken = require("../../middleware/verifyToken")

const {getAllUsers,suspendUser,reactivateUser,toggleUserStatus} = require("../../controllers/admin/adminController");


// Admin-only route example
router.get("/users",verifyToken, isAdmin,getAllUsers);

router.put("/suspend/:id", verifyToken, isAdmin, suspendUser);
router.put("/reactivate/:id", verifyToken, isAdmin, reactivateUser);

router.put("/toggle-status/:id", verifyToken, isAdmin, toggleUserStatus);

module.exports = router;