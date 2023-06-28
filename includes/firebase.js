import { initializeApp, FirebaseError } from "firebase/app";
import { getFirestore, Timestamp, collection, addDoc, getDocs, where, doc, getDoc, setDoc, deleteDoc, updateDoc, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// Export the required functions
export {
  db,
  query,
  where,
  FirebaseError,
  sendEmailVerification,
  sendPasswordResetEmail,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  Timestamp,
  setDoc,
  deleteDoc,
  updateDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};


