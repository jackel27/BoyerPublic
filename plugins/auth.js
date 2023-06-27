import { useAuthStore } from '../stores/auth';

export default () => {
  // Initialize the auth store
  const authStore = useAuthStore();
  // Initialize the auth state listener
  authStore.initializeAuthStateListener();
};