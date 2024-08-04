import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxOcwjSZ6xJLG762B0V0-IrlazOeq8QGg",
  authDomain: "inventory-management-app-8ee7a.firebaseapp.com",
  projectId: "inventory-management-app-8ee7a",
  storageBucket: "inventory-management-app-8ee7a.appspot.com",
  messagingSenderId: "844619509552",
  appId: "1:844619509552:web:8efc134dd7c4b9bb8ee2f5",
  measurementId: "G-2FDBZK9V1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Conditionally initialize Analytics if running in the browser
let analytics = null;
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  }).catch(err => {
    console.error("Analytics failed to load:", err);
  });
}

// Export Firestore and Analytics (if initialized)
export { firestore, analytics };







