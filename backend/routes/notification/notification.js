// const express = require("express");
// const User = require("../../models/User");
// const router = express.Router();
// const {getToken,sendLikeNotification,sendFirebaseNotification,sendReviewNotification } = require("../../controllers/notification/notification_controller");
// const Notification = require("../../models/notification/notificationSchema");

// router.post("/save-token", getToken);

// router.post("/send-like-notification",sendLikeNotification);

// router.post("/send-notification",async(req,res)=>{
//     const result = await sendFirebaseNotification(req,res);
//     return res.send(result);
// })

// router.post("/submit-review-notification", sendReviewNotification);

// router.get("/notifications/:userId", async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.params.userId }).sort({ timestamp: -1 });
//     res.status(200).json(notifications);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch notifications" });
//   }
// });

// router.post("/notifications/:userId/markRead", async (req, res) => {
//   try {
//     await Notification.updateMany({ userId: req.params.userId, isRead: false }, { isRead: true });
//     res.status(200).json({ message: "Notifications marked as read" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to mark notifications as read" });
//   }
// });



// module.exports = router;

// routes/notification/notification.js
const express = require("express");
const router = express.Router();
const Notification = require("../../models/notification/notificationSchema");

const {
  getToken,
  sendLikeNotification,
  sendFirebaseNotification,
  sendReviewNotification,
} = require("../../controllers/notification/notification_controller");

let io;
let userSocketMap;

function setSocketIO(ioInstance, socketMap) {
  io = ioInstance;
  userSocketMap = socketMap;
}

router.post("/save-token", getToken);
router.post("/send-like-notification", sendLikeNotification);
router.post("/send-notification", async (req, res) => {
  const result = await sendFirebaseNotification(req, res);
  return res.send(result);
});
router.post("/submit-review-notification", sendReviewNotification);

router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/notifications/:userId/markRead", async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.params.userId, isRead: false }, { isRead: true });

    if (io && userSocketMap) {
      const socketId = userSocketMap[req.params.userId.toString()];
      if (socketId) {
        io.to(socketId).emit("notificationsMarkedRead");
      }
    }

    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
});

module.exports = { router, setSocketIO };
