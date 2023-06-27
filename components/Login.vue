<template>
  <div class="custom-bg min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-white">
          <h1 class="display-4 mb-3">Boyer Towing</h1>
          <p class="lead">Welcome back! Log in to apply for Career Opportunities with us.</p>
        </div>
        <div class="col-md-6">
          <div class="card bg-card-gradient text-light shadow-lg rounded p-4">
            <h2 class="text-center mb-4">Login</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary shadow-sm px-4" type="submit">Login</button>
              </div>
              <div v-if="loginError" class="text-danger mb-3 text-center">{{ loginError }}</div>
              <div class="d-flex justify-content-between mt-3">
                <small>
                  <router-link to="/register" class="text-decoration-none text-primary">
                    Register an Account
                  </router-link>
                </small>
                <small>
                  <router-link to="/forgot-password" class="text-decoration-none text-primary">
                    Forgot Password?
                  </router-link>
                </small>
              </div>
            </form>
            <div v-if="loginSuccess" class="text-success mb-3 text-center">{{ loginSuccess }}</div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal" v-if="showModal">
      <div class="modal d-block" tabindex="-1" role="dialog" @click.self="closeModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="registrationStatusModalLabel">Login status</h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Email not verified. Please check your email to verify your email address.</p>
              <button class="btn btn-primary" @click="resendEmailVerification">Resend the confirmation email.</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.custom-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(50, 55, 64, 0.4)), url('~/assets/images/tug1.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.form-control {
  color: white;
}
.card, .card .form-control {
  background-color: rgba(36, 46, 56, 0.75);
}
.bg-card-gradient {
  background-image: v-bind(gradient);
  border: none;
}
</style>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRouter } from '#app';
import { useAuthStore } from '../stores/auth';
const loginError = ref('');
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loginSuccess = ref('');
const lighterColor = '#A0D6FF'; // Replace these with colors picked from the image
const darkerColor = '#0E3358';
const showModal = ref(false);
const userForResendEmail = ref(null);
const router = useRouter();
const gradient = computed(() => {
  return `linear-gradient(rgba(${lighterColor}, 0.1), rgba(${darkerColor}, 0.4))`;
});

async function login() {
  try {
    const userCredential = await authStore.signIn(email.value, password.value);

    if (!userCredential.user.emailVerified) {
      userForResendEmail.value = userCredential.user; // Store the user object
      showModal.value = true;
      await authStore.signOut(); // Sign out the user since the email is not verified
    } else {
      loginSuccess.value = "Login successful! Redirecting to the home page...";
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  } catch (error) {
    loginError.value = "Incorrect email or password. Please try again.";
  }
}

async function resendEmailVerification() {
  try {
    await authStore.resendVerificationEmail(userForResendEmail.value); 
    // Use stored user object
    loginSuccess.value = "Email verification link has been sent to your email. Please check your inbox.";
    showModal.value = false;
  } catch (error) {
    loginError.value = `Error sending the verification link: ${error.message}`;
    showModal.value = false;
  }
}

const closeModal = () => {
  showModal.value = false;
};
</script>