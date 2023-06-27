import { initializeApp, FirebaseError } from "firebase/app";
import { getFirestore, Timestamp, collection, addDoc, getDocs, where, doc, getDoc, setDoc, deleteDoc, updateDoc, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "boyer-f35f5",
  storageBucket: "boyer-f35f5.appspot.com",
  messagingSenderId: "947602977493",
  appId: "1:947602977493:web:b5e239fb62ff08d5a4e85c"
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


