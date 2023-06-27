<template>
  <div class="custom-bg min-vh-100 d-flex flex-column">
    <div class="container py-5">
      <h1 class="mb-5 text-center text-white display-4">Job Postings</h1>

      <div class="row about-us-section mb-5 bg-card-gradient rounded p-4 text-light shadow-lg">
    <div class="col-md-6">
        <h3>Why Work With Us?</h3>
        <p>At Boyer Towing, we understand that our strength lies in our dedicated team of professionals. We believe in fostering an inclusive work environment that encourages growth, rewards performance, and provides opportunities for career advancement.</p>
        
        <p>As a part of our team, you'll be contributing to a legacy that has been shaping the maritime industry for nearly a century. You'll work on exciting and challenging projects, alongside a group of passionate professionals who are committed to making a difference in the maritime world.</p>
        
        <p>We value the unique skills, perspectives, and experiences that each team member brings to our company. Whether you're a seasoned maritime professional or a fresh graduate looking to start a fulfilling career, Boyer Towing offers an environment that nurtures talent, promotes innovation, and encourages continuous learning and development.</p>
    </div>
    <div class="col-md-6">
      <h3>Benefits of Working With Us</h3>
      <ul class="list-unstyled">
        <li><i class="bi bi-check-circle-fill text-success"></i> Comprehensive Health Insurance</li>
        <li><i class="bi bi-check-circle-fill text-success"></i> Free Lunches</li>
        <li><i class="bi bi-check-circle-fill text-success"></i> Remote Work Options</li>
        <li><i class="bi bi-check-circle-fill text-success"></i> Competitive Retirement Plans</li>
        <li><i class="bi bi-check-circle-fill text-success"></i> Professional Development Opportunities</li>
        <li><i class="bi bi-check-circle-fill text-success"></i> Employee Assistance Programs</li>
        <li><i class="bi bi-check-circle-fill text-success"></i> Wellness Programs</li>
      </ul>
    </div>
  </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="(job, index) in filteredJobs" :key="index">
        <div class="card mb-4 shadow-lg bro-card rounded p-3" @click="goToJobDetails(job.id)">
          <div class="card-header bg-transparent border-0 pb-0">
            <h3>{{ job.title }}</h3>
            <p><small>{{ job.lastModified ? formatDate(job.lastModified) : job.created }}</small></p>
          </div>
          <div class="card-body pt-2">
            <h5>{{ job.location }}</h5>
            <p class="mb-4">{{ truncate(job.description, 100) }}</p>
            <button class="btn btn-primary" @click="goToJobDetails(job.id)">View Job</button>
          </div>
        </div>
      </div>
    </div>

    <div class="testimonial-section mt-5 bg-card-gradient rounded p-4 text-light shadow-lg">
      <h3>What Our Employees Say</h3>
      <blockquote class="blockquote">
        <p>I love the Sea... This job is amazing! Good pay, benefits and more. Working for a family owned company, they treat all of us well!</p>
        <footer class="blockquote-footer">David</footer>
      </blockquote>
      <!-- Add More Testimonials -->
    </div>

  </div>
</div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('~/assets/images/tug3.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bro-input {
  background-color: rgba(255, 255, 255, 0.8);
}

.bro-card {
  background-color: rgb(26 35 39 / 80%);
  color: #dadada;
  border: none;
}

.bg-card-gradient {
  background-color: rgba(36, 46, 56, 0.75);
  color: #ffffff;
}
.btn-primary {
  --bs-btn-bg: #1d1f30;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useJobsStore } from '../stores/jobs';
import { useRouter } from 'vue-router';

const router = useRouter();
const jobsStore = useJobsStore();
const search = ref("");
const sortBy = ref("title");

const formatDate = (dateString) => {
  // If no date is provided, return an empty string
  if (!dateString) return '';
  const date = new Date(dateString);
  return `Posted on: ${date.toLocaleDateString()}`;
};

onMounted(async () => {
  // Fetch the job listings from the store
  jobsStore.getJobListings();
});

const filteredJobs = computed(() => {
  // If the job listings haven't been fetched yet, return an empty array
  if (!jobsStore.jobPostings) return [];

  const filtered = jobsStore.jobPostings.filter((job) =>
    // Filter the job listings based on the search term and the status
    job.title.toLowerCase().includes(search.value.toLowerCase()) && job.status !== 'closed'
  );

  const sorted = filtered.sort((a, b) => {
    // Sort the job listings based on the selected sort option
    if (a[sortBy.value] > b[sortBy.value]) return 1;
    if (a[sortBy.value] < b[sortBy.value]) return -1;
    return 0;
  });

  return sorted;
});

const goToJobDetails = (jobId) => {
  // Navigate to the job details page
  router.push(`/jobDetails/${jobId}`);
};

const truncate = (text, charLimit) => {
  // Truncate the job description if it exceeds the character limit
  const appendEllipsis = text.length > charLimit;
  return appendEllipsis ? text.substring(0, charLimit) + '...' : text;
};
</script>
