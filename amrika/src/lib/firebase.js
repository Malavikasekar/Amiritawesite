import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-hQapVwgsfZQGkK05G6b6-U2bZrEUssI",
  authDomain: "malexsa.firebaseapp.com",
  projectId: "malexsa",
  storageBucket: "malexsa.firebasestorage.app",
  messagingSenderId: "323296404784",
  appId: "1:323296404784:web:e01e9906326a0a3e4414f5",
  measurementId: "G-LNLFCF44RK"
};

// Initialize Firebase only once to prevent multiple initializations in development
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
