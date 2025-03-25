import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_YvUwNDkXO4WeH19MF6bMnuljm12NoFU",
  authDomain: "prepwise-f348a.firebaseapp.com",
  projectId: "prepwise-f348a",
  storageBucket: "prepwise-f348a.firebasestorage.app",
  messagingSenderId: "1031956796389",
  appId: "1:1031956796389:web:871221f498da849734d50c",
  measurementId: "G-832EQXZ47V",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
