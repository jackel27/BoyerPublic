<template>
  <div class="container mt-4" v-if="job">
    <div class="row">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Job Details</h2>
        <div class="card">
          <div class="card-header">
            <h4>{{ job.title }}</h4>
          </div>
          <div class="card-body">
            <dl>
              <dt>Date Created</dt>
              <dd>{{ job.postingDate }}</dd>
              <dt>Status</dt>
              <dd>
                <span v-if="job.status === 'open'" class="text-success">Open</span>
                <span v-else>Closed</span>
              </dd>
              <dt>Location</dt>
              <dd>{{ job.location }}</dd>
              <dt>Duration</dt>
              <dd>{{ job.duration }}</dd>
              <dt>Requirements</dt>
              <dd>{{ job.requirements }}</dd>
              <dt>Description</dt>
              <dd>{{ job.description }}</dd>

              <!-- Apply button and login prompt -->
              <div v-if="loggedInUser">
                <nuxt-link :to="`/jobDetails/${job.id}-apply`" class="btn btn-primary">
                  Apply
                </nuxt-link>
              </div>
              <div v-else>
                <p>You must be logged in to apply for this position</p>
                <nuxt-link class="btn btn-primary" to="/login">Login</nuxt-link>
              </div>
            </dl>
          </div>
        </div>
        <div class="text-center my-4">
          <nuxt-link to="/jobs" class="btn btn-secondary">
            Go back to Jobs page
          </nuxt-link>
        </div>
      </div>
      
      <div class="col-md-6">
        <h2 class="text-center mb-4"> &nbsp;</h2>
        <div id="carouselExampleFade" class="carousel slide carousel-fade mb-4" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="~/assets/images/tug1.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="~/assets/images/tug2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="~/assets/images/tug3.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="~/assets/images/tug4.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading job details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useJobsStore } from '../../stores/jobs';
import { useAuthStore } from '../../stores/auth';

const jobsStore = useJobsStore();
const router = useRouter();
const authStore = useAuthStore();
const loggedInUser = ref(authStore.user);
const jobId = router.currentRoute.value.params.id;
const job = ref({});

onMounted(async () => {
  job.value = await jobsStore.getJobById(jobId);
});

watch(
  () => authStore.user,
  (newValue) => {
    loggedInUser.value = newValue;
  }
);
</script>