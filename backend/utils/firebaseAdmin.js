
require('dotenv').config();
const admin = require("firebase-admin");
// const serviceAccount = require("../sialconnect-firebase-adminsdk.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  module.exports = admin;
  
