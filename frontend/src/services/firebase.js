// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging,getToken,onMessage} from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const vapidkey = import.meta.env.VITE_FIREBASE_VAPID_KEY



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);


const analytics = getAnalytics(app);


// Function to request permission and get FCM Token
export const requestPermissionAndGetToken = async (userId) => {
  try {
    // Request permission for push notifications
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Get the FCM token
      const token = await getToken(messaging, { vapidKey: vapidkey });

      if (token) {
        console.log("FCM Token:", token);
        // Send the token to your backend (e.g., MongoDB) using an API call
        saveTokenToBackend(userId, token);
      }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Function to save token to the backend
const saveTokenToBackend = async (userId, token) => {
  try {
    await fetch("/api/save-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        fcmToken: token,
      }),
    });
    console.log("Token saved to backend.");
  } catch (error) {
    console.error("Failed to save token to backend:", error);
  }
};

// Function to listen for incoming messages while app is in the foreground
export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Notification received in foreground:", payload);
    // Show the notification (you can customize this)
    const { notification } = payload;
    if (notification) {
      alert(`${notification.title}: ${notification.body}`);
    }
  });
};