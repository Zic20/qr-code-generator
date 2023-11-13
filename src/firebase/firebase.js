// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJ5m-M9eCEuj-urnevis8jrau7CRKby9Q",
  authDomain: "qrcode-generator-c2bab.firebaseapp.com",
  projectId: "qrcode-generator-c2bab",
  storageBucket: "qrcode-generator-c2bab.appspot.com",
  messagingSenderId: "111309446812",
  appId: "1:111309446812:web:56d390b35da4209c0a1759",
  measurementId: "G-FH65RDJNEM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
