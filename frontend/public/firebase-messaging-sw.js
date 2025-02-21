// // firebase-messaging-sw.js
// import { onBackgroundMessage } from 'firebase/messaging/sw'; // Import from Firebase Messaging SW module
// import { messaging } from './src/services/firebase'; // Path to your messaging instance (adjust if needed)

// // Listen for background messages
// onBackgroundMessage(messaging, (payload) => {
//   console.log('Received background message: ', payload);

//   // Customize the notification here (e.g., show a notification)
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });


// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');



// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload)  {
//   console.log('Received background message: ', payload);
// })


// // firebase-messaging-sw.js
// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// // Initialize Messaging
// const messaging = getMessaging();

// // Listen for background messages
// onBackgroundMessage(messaging, (payload) => {
//   console.log('Received background message: ', payload);
  
//   // Customize the notification here (e.g., show a notification)
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   // Show the notification
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });



// firebase-messaging-sw.js

// Use importScripts() for loading Firebase SDKs in service worker
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAaDv0HknzALGxKg1X6q5VO1elxP_4BjM",
  authDomain: "sialconnect.firebaseapp.com",
  projectId: "sialconnect",
  storageBucket: "sialconnect.firebasestorage.app",
  messagingSenderId: "333042925030",
  appId: "1:333042925030:web:19d5d1f8c7540e8f1d6a27",
  measurementId: "G-ND793NJLYH"
};

const vapidkey = "BFK5NHAYmuIPel76_vOxcyYFYwBtosjkbuM6fhgf0XyrODdtg0PQI_pRpGoph2elctRxhOXIA5s3n1gZzxPt6Mk";


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Received background message: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Show notification in the background
  self.registration.showNotification(notificationTitle, notificationOptions);
});
