<template>
  <div class="d-flex flex-column min-vh-100 custom-bg">
    <nav class="navbar navbar-expand-lg navbar-dark shadow">
      <div class="container">
        <a class="navbar-brand font-weight-bold" href="#">BoyerTowing</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/jobs">Careers</nuxt-link>
            </li>
            <li class="nav-item" v-if="!loggedInUser">
              <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
            </li>
            <li class="nav-item" v-if="!loggedInUser">
              <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
            </li>
          </ul>
          <!-- Add this section inside the navbar-collapse div in the default.vue layout to display user's email -->
          <div v-if="loggedInUser" class="ms-auto">
            <span class="navbar-text me-3">{{ loggedInUser.email }}</span>
          </div>
          <!-- Dropdown component -->
          <ul v-if="loggedInUser" class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <button @click="authStore.signOut" class="dropdown-item">Sign Out</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="flex-grow-1">
      <NuxtPage />
    </div>
    <footer class="py-3 mt-auto shadow" style="background: linear-gradient(to right, #13141e, #212f3b);">
  <div class="container text-center">
    <p class="mb-0 text-light">&copy; 2023 Boyer Towing. All rights reserved.</p>
  </div>
</footer>

  </div>
</template>

<style scoped>
.custom-bg {
  background-color: var(--bg-color);
}

.navbar {
  background-color: var(--nav-bg-color);
}
</style>

<script setup>
// Path: layouts\default.vue
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import { useAuthStore } from '../stores/auth';
import { ref, watch } from 'vue';
const authStore = useAuthStore();
const loggedInUser = ref(authStore.user);

watch(
  // watch the authStore.user value
  () => authStore.user,
  (newValue) => {
    // update the loggedInUser ref value
    loggedInUser.value = newValue;
  }
);
</script>