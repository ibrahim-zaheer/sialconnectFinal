// serviceWorkerRegistration.js
// Register the Firebase Messaging service worker
import { messaging } from './services/firebase'; // Assuming this file contains the FCM configuration

// serviceWorkerRegistration.js
// Register the Firebase Messaging service worker
export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js') // Path to your service worker file
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  }
};

