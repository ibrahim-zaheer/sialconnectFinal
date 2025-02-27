const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const {getToken,sendLikeNotification,sendFirebaseNotification,sendReviewNotification } = require("../../controllers/notification/notification_controller");


router.post("/save-token", getToken);

router.post("/send-like-notification",sendLikeNotification);

router.post("/send-notification",async(req,res)=>{
    const result = await sendFirebaseNotification(req,res);
    return res.send(result);
})

router.post("/submit-review-notification", sendReviewNotification);



module.exports = router;