// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDxOcwjSZ6xJLG762B0V0-IrlazOeq8QGg",
//   authDomain: "inventory-management-app-8ee7a.firebaseapp.com",
//   projectId: "inventory-management-app-8ee7a",
//   storageBucket: "inventory-management-app-8ee7a.appspot.com",
//   messagingSenderId: "844619509552",
//   appId: "1:844619509552:web:8efc134dd7c4b9bb8ee2f5",
//   measurementId: "G-2FDBZK9V1T"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Analytics (optional)
// const analytics = getAnalytics(app);

// // Initialize Firestore
// const firestore = getFirestore(app);

// // Export Firestore for use in other parts of your app
// export { firestore };






// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDxOcwjSZ6xJLG762B0V0-IrlazOeq8QGg",
//   authDomain: "inventory-management-app-8ee7a.firebaseapp.com",
//   projectId: "inventory-management-app-8ee7a",
//   storageBucket: "inventory-management-app-8ee7a.appspot.com",
//   messagingSenderId: "844619509552",
//   appId: "1:844619509552:web:8efc134dd7c4b9bb8ee2f5",
//   measurementId: "G-2FDBZK9V1T"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const firestore = getFirestore(app);

// // Conditionally initialize Analytics if running in the browser
// let analytics = null;
// if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
//   const { getAnalytics, isSupported } = require('firebase/analytics');
//   isSupported().then(supported => {
//     if (supported) {
//       analytics = getAnalytics(app);
//     }
//   });
// }

// // Export Firestore and Analytics (if initialized)
// export { firestore, analytics };



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











// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // Ensure this is present in your firebase.js
// import { getFirestore } from "firebase/firestore";
// const firestore = getFirestore();
// export { firestore };

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDxOcwjSZ6xJLG762B0V0-IrlazOeq8QGg",
//   authDomain: "inventory-management-app-8ee7a.firebaseapp.com",
//   projectId: "inventory-management-app-8ee7a",
//   storageBucket: "inventory-management-app-8ee7a.appspot.com",
//   messagingSenderId: "844619509552",
//   appId: "1:844619509552:web:8efc134dd7c4b9bb8ee2f5",
//   measurementId: "G-2FDBZK9V1T"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




















// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // Ensure this is present in your firebase.js
// import { getFirestore } from "firebase/firestore";
// const firestore = getFirestore();
// export { firestore };

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDxOcwjSZ6xJLG762B0V0-IrlazOeq8QGg",
//   authDomain: "inventory-management-app-8ee7a.firebaseapp.com",
//   projectId: "inventory-management-app-8ee7a",
//   storageBucket: "inventory-management-app-8ee7a.appspot.com",
//   messagingSenderId: "844619509552",
//   appId: "1:844619509552:web:8efc134dd7c4b9bb8ee2f5",
//   measurementId: "G-2FDBZK9V1T"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);