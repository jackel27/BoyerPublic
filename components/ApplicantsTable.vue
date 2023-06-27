<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Job Applicants</h2>
    <div v-if="job">
      <h3>{{ job.title }}</h3>
      <div class="d-flex justify-content-end input-group mb-3">
        <input v-model="filterKeyword" @input="handleFilter" type="text" class="form-control" placeholder="Search applicants" aria-label="Search applicants" />
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" @click="handleSort('id')">Applicant ID</th>
              <th scope="col" @click="handleSort('firstName')">First Name</th>
              <th scope="col" @click="handleSort('lastName')">Last Name</th>
              <th scope="col" @click="handleSort('phone')">Phone</th>
              <th scope="col" @click="handleSort('dateApplied')">Date Applied</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="applicant in sortedAndFilteredApplicants" :key="applicant.id">
              <template v-if="applicant && applicant.id">
                <td>{{ applicant.userId }}</td>
                <td>{{ applicant.firstName }}</td>
                <td>{{ applicant.lastName }}</td>
                <td>{{ applicant.phone }}</td>
                <td>{{ new Date(applicant.dateApplied.seconds * 1000).toLocaleDateString() }}</td>
                <td>
                  <button class="btn btn-info btn-sm me-2" @click="showDetails(applicant)">Details</button>
                  <button class="btn btn-danger btn-sm" @click="deleteApplicant(applicant.id)">Delete</button>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  applicants: Array, // Add the applicants prop
  job: Object, // Add the job prop
});

const handleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
};

const handleFilter = () => {
  // No need to do anything here, the input event will trigger a reactivity update
};

const sortBy = ref(null);
const sortOrder = ref(null);
const filterKeyword = ref('');
const expandedApplicantId = ref(null);

const sortedAndFilteredApplicants = computed(() => {
  let apps = props.applicants.slice(); // use slice to create a shallow copy

  // Apply the sorting
  if (sortBy.value) {
    apps.sort((a, b) => {
      const aValue = sortBy.value === 'dateApplied' ? a[sortBy.value].seconds : a[sortBy.value];
      const bValue = sortBy.value === 'dateApplied' ? b[sortBy.value].seconds : b[sortBy.value];
      const compare = aValue > bValue ? 1 : -1;
      return sortOrder.value === 'asc' ? compare : -compare;
    });
  }

  // Apply the filtering
  if (filterKeyword.value) {
    const keyword = filterKeyword.value.toLowerCase();
    apps = apps.filter((applicant) => {
      return Object.values(applicant).some((value) =>
        String(value).toLowerCase().includes(keyword)
      );
    });
  }

  return apps;
});

const showDetails = (applicant) => {
  const jsonString = encodeURIComponent(JSON.stringify(applicant));
  const routePath = `/applicant-details?applicant=${jsonString}`;
  const newWindow = window.open(routePath, '_blank', 'width=800,height=600');
  if (newWindow) newWindow.opener = null;
};
const deleteApplicant = async (applicantId) => {
  // delete the applicant here
};
</script>

<style scoped>
/* Add any required styling here */
</style>