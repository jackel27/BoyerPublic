<template>
  <div class="container mt-4">
    <!-- <h2 class="text-center mb-4">Job Applicants</h2> -->
    <div v-if="!loading && job">
      <!-- <h3>{{ job.title }}</h3> -->
      <applicants-table :applicants="applicants" :job="job"></applicants-table>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useJobsStore } from '~/stores/jobs';
import ApplicantsTable from '@/components/ApplicantsTable.vue';
const jobsStore = useJobsStore();
const router = useRouter();
const jobId = router.currentRoute.value.params.id;
const job = ref(null);
const applicants = ref([]);
const loading = ref(true);

onMounted(async () => {
  job.value = await jobsStore.getJobById(jobId);
  applicants.value = await jobsStore.getApplicantsByJobId(jobId);
  console.log('applicants', applicants.value);
  loading.value = false;
});

</script>