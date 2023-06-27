<template>
  <div class="custom-bg min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-white">
          <h1 class="display-4 mb-3">Boyer Towing</h1>
          <p class="lead">Create an account to start applying for open positions.</p>
        </div>
        <div class="col-md-6">
          <div class="card text-light shadow-lg rounded p-4" :style="{ backgroundImage: gradient }">
            <h2 class="text-center mb-4">Register</h2>
            <form @submit.prevent="register">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="firstName" :class="{ 'is-invalid': isEmptyField(firstName.value) }" v-model="firstName" required />
                  <div v-if="isEmptyField(firstName)" class="invalid-feedback">First Name is required</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="lastName" :class="{ 'is-invalid': isEmptyField(lastName.value) }" v-model="lastName" required />
                  <div v-if="isEmptyField(lastName)" class="invalid-feedback">Last Name is required</div>
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" :class="{ 'is-invalid': isEmptyField(email.value) || !emailPattern.test(email) }" v-model="email" required />
                <div v-if="isEmptyField(email)" class="invalid-feedback">Email is required</div>
                <div v-if="!emailPattern.test(email)" class="invalid-feedback">Invalid email format</div>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="phone" :class="{ 'is-invalid': isEmptyField(phone.value) || !phonePattern.test(phone) }" v-model="phone" required />
                <div v-if="isEmptyField(phone)" class="invalid-feedback">Phone number is required</div>
                <div v-if="!phonePattern.test(phone)" class="invalid-feedback">Invalid phone number format</div>
              </div>
              <div class="mb-3">
                <label for="dob" class="form-label">Date of Birth</label>
                <input type="date" class="form-control" id="dob" :class="{ 'is-invalid': isEmptyField(dob.value) }" v-model="dob" required />
                <div v-if="isEmptyField(dob)" class="invalid-feedback">Date of Birth is required</div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" :class="{ 'is-invalid': isEmptyField(password) || !isPasswordLengthValid }" v-model="password" required />
                  <div v-if="isEmptyField(password)" class="invalid-feedback">Password is required</div>
                  <div v-if="password && !isPasswordLengthValid" class="invalid-feedback">
                    Password must be at least 8 characters
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input type="password" class="form-control" id="confirmPassword" :class="{ 'is-invalid': isEmptyField(confirmPassword.value) || passwordMismatch }" v-model="confirmPassword" required />
                  <div v-if="isEmptyField(confirmPassword)" class="invalid-feedback">Password confirmation is required</div>
                  <div v-if="passwordMismatch" class="invalid-feedback">Password and confirmation password must match</div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary shadow-sm px-4" type="submit">Register</button>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <small>
                  <router-link to="/login" class="text-decoration-none text-primary">
                    Back to Login
                  </router-link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal"
      tabindex="-1"
      :class="{ 'show': showModal }"
      id="registrationStatusModal"
      data-bs-backdrop="static"
      data-bs-keyboard="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registration status</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ modalContent }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .custom-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(50, 55, 64, 0.4)), url('~/assets/images/tug2.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .card, .card .form-control {
    background-color: rgba(36, 46, 56, 0.75);
  }
  .form-control {
    color: #fff;
  }
  .bg-card-gradient {
    background-image: v-bind(gradient);
    border: none;
  }
</style>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

const lighterColor = '#A0D6FF';
const darkerColor = '#0E3358';

const gradient = computed(() => {
  return `linear-gradient(rgba(${lighterColor}, 0.1), rgba(${darkerColor}, 0.4))`;
});

const authStore = useAuthStore();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const dob = ref('');
const password = ref('');
const confirmPassword = ref('');
const submitted = ref(false);
const showModal = ref(false);
const modalContent = ref('');

const phonePattern = /^\+?1?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isFormSubmitted = computed(() => submitted.value);

const register = async () => {
  submitted.value = true;
  if (isFormInvalid.value) return;

  try {
    await authStore.register(email.value, password.value, firstName.value, lastName.value, phone.value, dob.value);
    modalContent.value = "Registration successful! Please check your email to verify your email address.";
    showModal.value = true;
    const modal = new bootstrap.Modal(document.getElementById('registrationStatusModal'), {
      backdrop: 'static'
    });
    modal.show();

    // Close modal when 'hide' event occurs
    modal._element.addEventListener('hide.bs.modal', () => {
      hideModal();
    });

  } catch (err) {
    modalContent.value = `Registration failed: ${err.message}`;
    showModal.value = true;
    const modal = new bootstrap.Modal(document.getElementById('registrationStatusModal'), {});
    modal.show();

    // Close modal when 'hide' event occurs
    modal._element.addEventListener('hide.bs.modal', () => {
      hideModal();
    });
  }
};


const hideModal = () => {
  showModal.value = false;
};

const isPasswordLengthValid = computed(() => password.value.length >= 8);
const passwordMismatch = computed(() => password.value && confirmPassword.value && password.value !== confirmPassword.value);

const isEmptyField = (value) => submitted.value && !String(value || '').trim();
const isFormInvalid = computed(() => [
  firstName,
  lastName,
  email,
  phone,
  dob,
  password,
  confirmPassword,
].some(isEmptyField) || !isPasswordLengthValid.value || passwordMismatch.value);
</script>
