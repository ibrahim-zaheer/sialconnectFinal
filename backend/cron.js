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

const { checkDeliveryDateNotification, checkDeliveryDateNotificationExporter } = require("./controllers/order/order_controller");






// cron.schedule(
//   "*/15 * * * *",
  // '* * * * *',
//   () => {
//     console.log("Running reminder check...");
//     checkAndSendReminders();
//     checkDeliveryDateNotification();
//     checkDeliveryDateNotificationExporter();
//   },
//   {
//     timezone: "Asia/Karachi"
//   }
// );

cron.schedule(
  "*/15 * * * *",
    // '* * * * *',
  async () => {
    try {
      console.log("Running reminder check...");
      await checkAndSendReminders();
      await checkDeliveryDateNotification();
      await checkDeliveryDateNotificationExporter();
    } catch (error) {
      console.error("Error in scheduled task:", error);
    }
  },
  {
    // timezone: "Asia/Karachi"
    timezone: "Etc/UTC" 
  }
);

console.log("Reminder scheduler started");
