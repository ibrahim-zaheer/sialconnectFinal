const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const {getToken } = require("../../controllers/notification/notification_controller");


router.post("/save-token", getToken);

module.exports = router;