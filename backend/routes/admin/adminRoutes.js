const express = require("express");
const router = express.Router();

const isAdmin = require("../../middleware/isAdmin");

const {getAllUsers} = require("../../controllers/admin/adminController");


// Admin-only route example
router.get("/users", isAdmin,getAllUsers);

module.exports = router;