// const cron = require("node-cron");
// const {checkAndSendReminders} = require("./controllers/offers/offer_controller");

// cron.schedule("*/15 * * * *", () => {
//   console.log("Running reminder check...");
//   checkAndSendReminders();
// });

// // cron.schedule("* * * * *", () => {
// //   console.log("Running reminder check every minute...");
// //   checkAndSendReminders();
// // });

// console.log("Reminder scheduler started");


const cron = require("node-cron");
const { checkAndSendReminders } = require("./controllers/offers/offer_controller");

const { checkDeliveryDateNotification } = require("./controllers/order/order_controller");






cron.schedule(
  "*/15 * * * *",
  // '* * * * *',
  () => {
    console.log("Running reminder check...");
    checkAndSendReminders();
    checkDeliveryDateNotification();
  },
  {
    timezone: "Asia/Karachi"
  }
);

console.log("Reminder scheduler started");
