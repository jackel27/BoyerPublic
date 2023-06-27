<template>
  <section class="container py-5">
    <div class="container">
      <h2 class="text-center text-uppercase mb-5 title">Recent Job Postings</h2>
      <div class="row">
        <div
          v-for="(job, index) in recentJobs"
          :key="index"
          class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
        >
          <div class="card h-100 shadow border-0">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title font-weight-bold">{{ job.title }}</h5>
              <h6 class="card-subtitle mb-3 text-muted">{{ job.location }}</h6>
              <p class="card-text flex-grow-1 mb-0">
                {{ truncate(job.description, 100) }}
              </p>
              <nuxt-link
                :to="`/jobDetails/${job.id}`"
                class="card-link mt-auto btn btn-dark"
                >View Details</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useJobsStore } from '../stores/jobs';

const jobsStore = useJobsStore();
const recentJobs = computed(() => {
  if (!jobsStore.jobPostings) return [];
  // Sort by date created, then take the first 4
  return jobsStore.jobPostings.slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .slice(0, 4);
});

onMounted(async () => {
  jobsStore.getJobListings();
});

const truncate = (text, charLimit) => {
  // If text is longer than charLimit, append ellipsis
  const appendEllipsis = text.length > charLimit;
  return appendEllipsis ? text.substring(0, charLimit) + '...' : text;
};
</script>
<style scoped>
.card {
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.title {
  color: #3d3d3d;
  font-weight: 700;
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
}
.card-link {
  background-color: lightskyblue;
}
.text-muted {
  font-style: italic;
}
</style>
