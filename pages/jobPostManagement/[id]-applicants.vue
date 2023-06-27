<template>
  <div class="container mt-4">
    <div v-if="!loading && job">
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
  // Get the job and applicants
  job.value = await jobsStore.getJobById(jobId);
  applicants.value = await jobsStore.getApplicantsByJobId(jobId);
  console.log('applicants', applicants.value);
  loading.value = false;
});

</script>