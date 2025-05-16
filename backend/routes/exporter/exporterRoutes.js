const express = require("express");
const router = express.Router();

const {upgradeUserToPro,createPaymentIntent} = require("../../controllers/profile_controller");
const authenticateMiddleware = require("../../middleware/authMiddleware.js");
router.post("/pricing" ,authenticateMiddleware,upgradeUserToPro);
router.post("/create-payment-intent",createPaymentIntent);
module.exports = router;