import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Boutique SaaS Production Config
const firebaseConfig = {
  apiKey: "AIzaSyA9Ljox72HYj2tS58R-3Z3vivF5z0E1gLM",
  authDomain: "butique-b934d.firebaseapp.com",
  projectId: "butique-b934d",
  storageBucket: "butique-b934d.firebasestorage.app",
  messagingSenderId: "234341061665",
  appId: "1:234341061665:web:3ff3f93700e64bf0673f60",
  measurementId: "G-P4JYC270TG"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
