// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA14aq2pHCkuZZ8N4bD4MzrKQtF9NluJ5A",
  authDomain: "juicebanana.firebaseapp.com",
  projectId: "juicebanana",
  storageBucket: "juicebanana.appspot.com",
  messagingSenderId: "148297074945",
  appId: "1:148297074945:web:56f04e699b4838675f3300",
  measurementId: "G-PDJG7EWKJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const auth = getAuth();
// npm ci && npm run build