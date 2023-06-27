<template>
  <div class="container mt-5">
    <h2>Forgot Password</h2>
    <p>Please enter your email address and we'll send you a link to reset your password:</p>
    <form @submit.prevent="sendResetPasswordEmail">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary" type="submit">Send Reset Link</button>
      </div>
      <div v-if="errorMessage" class="text-danger my-3">{{ errorMessage }}</div>
      <div v-if="successMessage" class="text-success my-3">{{ successMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth, sendPasswordResetEmail } from '~/includes/firebase'

const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')

async function sendResetPasswordEmail() {
  // Reset the error and success messages. This will hide them if they were previously shown.
  try {
    await sendPasswordResetEmail(auth, email.value)
    successMessage.value = 'A password reset link has been sent to your email address.'
  } catch (error) {
    errorMessage.value = 'Could not send a reset link. Please try again later.'
    console.error('Error sending password reset email:', error)
  }
}
</script>