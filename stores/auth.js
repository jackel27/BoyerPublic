import { defineStore } from 'pinia';
import { auth, db, getDoc, collection, setDoc, updateDoc, doc, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '../includes/firebase';

// Create a store
export const useAuthStore = defineStore('auth', {
  // Define all the used state variables
  state: () => ({
    user: null,
    firstName: '',
    lastName: '',
    phone: '',
    dob: ''
  }),
  actions: {
    // This function is used to save the user's information to Firestore
    async saveUserToFirestore(user, firstName, lastName, phone, dob) {
      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        dob: dob,
      });
    },
    // This function is used to update the user's information in Firestore
    setUser(user) {
      this.user = user;
    },
    async signOut() {
      // Sign out the user
      await signOut(auth);
    },
    async signIn(email, password) {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    },
    async getUserByEmail(email) {
      // Check if the user exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        throw new Error("User not found");
      }
      // Sign in the user with a temporary password
      const userCredential = await signInWithEmailAndPassword(auth, email, "temporaryPassword");
      const user = userCredential.user;
    
      await signOut(auth);
    
      return user;
    },
    async getUserProfile(user) {
      // Get the user's profile from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        return null;
      }
    },

    async resendVerificationEmail(user) {
      // Send a verification email to the user
      await sendEmailVerification(user);
    },
    async register(email, password, firstName, lastName, phone, dob) {
      // Register the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await this.saveUserToFirestore(userCredential.user, firstName, lastName, phone, dob);
    
      // Send a verification email to the user
      await sendEmailVerification(userCredential.user);
    },
    initializeAuthStateListener() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          if (!user.emailVerified) {
            // signOut(auth);
          } else {
            // Save the user's information to the store
            this.setUser(user);
          }
        } else {
          // User is signed out
          this.setUser(null);
        }
      });
    }
  }
});