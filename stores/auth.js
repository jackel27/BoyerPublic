import { defineStore } from 'pinia';
import { auth, db, getDoc, collection, setDoc, updateDoc, doc, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '../includes/firebase';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    firstName: '',
    lastName: '',
    phone: '',
    dob: ''
  }),
  actions: {
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
    setUser(user) {
      this.user = user;
    },
    async signOut() {
      await signOut(auth);
    },
    async signIn(email, password) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    },
    async getUserByEmail(email) {
      // Replace this part with the code to get the user with the given email
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        throw new Error("User not found");
      }
      
      // Log in the user temporarily to retrieve the currentUser instance from the auth object
      // Replace 'temporaryPassword' with the actual temporary password
      const userCredential = await signInWithEmailAndPassword(auth, email, "temporaryPassword");
      const user = userCredential.user;
    
      // Sign out the user after retrieving their information
      await signOut(auth);
    
      return user;
    },
    async getUserProfile(user) {
      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        return null;
      }
    },

    async resendVerificationEmail(user) {
      await sendEmailVerification(user);
    },
    async register(email, password, firstName, lastName, phone, dob) {
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
            this.setUser(user);
          }
        } else {
          // User is signed out
          this.setUser(null);
        }
      });
    },
  },
});