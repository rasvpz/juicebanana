import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA14aq2pHCkuZZ8N4bD4MzrKQtF9NluJ5A",
  authDomain: "juicebanana.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: "juicebanana",
  storageBucket: "juicebanana.appspot.com",
  messagingSenderId: "148297074945",
  appId: "1:148297074945:web:56f04e699b4838675f3300",
  measurementId: "G-PDJG7EWKJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Removed the unused analytics variable
export const auth = getAuth(app); // Added app as an argument
export default app


