const admin = require("firebase-admin");
const serviceAccount = require("../sialconnect-firebase-adminsdk-am9a9-42fef13fe2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  module.exports = admin;
  
