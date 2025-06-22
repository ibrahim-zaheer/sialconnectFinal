// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging,getToken,onMessage} from "firebase/messaging";

import {getStorage,ref, uploadBytes, getDownloadURL} from "firebase/storage";


import { useDispatch } from 'react-redux';
import { updateFcmToken } from '../redux/reducers/userSlice';

import axios from 'axios';

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

 const storage = getStorage(app);


const analytics = getAnalytics(app);
// export {  getToken, onMessage };
export {  getToken, onMessage, storage, ref, uploadBytes, getDownloadURL  };

// export const requestFCMToken = async()=>{
//   return Notification.requestPermission()
//   .then((permission)=>{
//     if(permission==="granted"){
//       return getToken(messaging,{vapidKey: vapidkey})
      
//     }
//     else{
//       throw new Error("Notfication not granted");
//     }
//   })
//   .catch((err)=>{
//     console.error("Error get FCM token",err)
//     throw err;
//   })
// }

export const requestFCMToken = async (userId) => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: vapidkey });
      
      if (token) {
        // Send the token to the backend
        await saveTokenToBackend(userId, token);
        return token;
      } else {
        throw new Error("Failed to get FCM token.");
      }
    } else {
      throw new Error("Notification permission not granted.");
    }
  } catch (err) {
    console.error("Error getting FCM token:", err);
    throw err;  // Rethrow the error so the caller can handle it
  }
};

export const onMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Notification received in foreground:", payload);
    // Show the notification (you can customize this)
    const { notification } = payload;
    if (notification) {
      alert(`${notification.title}: ${notification.body}`);
    }
  });
};

export const onMessageListening = () => {
  return new Promise((resolve, reject) => {
    try {
      onMessage(messaging, (payload) => {
        console.log("🚀 Foreground Notification Received:", payload); // ✅ Confirm log appears
        resolve(payload); // ✅ Ensure it resolves with the payload
      });
    } catch (error) {
      console.error("❌ Error in onMessageListening:", error);
      reject(error);
    }
  });
};



// export const onMessageListening = ()=>{
//  return new Promise((resolve)=>{
//     onMessage(messaging,(payload)=>{
//       resolve(payload)
//     })
//   })
// }


// Request permission and get the FCM token
export const requestPermissionAndGetToken = async (userId, dispatch) => {
  try {
    // Request permission to receive push notifications
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Get FCM token
      const token = await getToken(messaging);
      if (token) {
        // Save token to backend (you may use an API to save it)
        await fetch("/api/notification/save-token", {
          method: "POST",
          body: JSON.stringify({ userId, fcmToken: token }),
          headers: { "Content-Type": "application/json" },
        });

        // Update the Redux store with the FCM token
        dispatch(updateFcmToken(token));
        console.log("token is saved");
      }
    }
  } catch (error) {
    console.error("Error getting notification permission or token", error);
  }
};
// Function to save token to the backend
const saveTokenToBackend = async (userId, token) => {
  try {
    await fetch("/api/notification/save-token", {
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

