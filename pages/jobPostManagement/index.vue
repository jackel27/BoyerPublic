<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Job Post Management</h2>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="addJob">Add Job</button>
    </div>
    <div class="d-flex justify-content-end input-group mb-3">
      <input v-model="filterKeyword" @input="handleFilter" type="text" class="form-control" placeholder="Search jobs" aria-label="Search jobs" />
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" @click="handleSort('id')">id</th>
            <th scope="col" @click="handleSort('created')">Date</th>
            <th scope="col" @click="handleSort('lastModified')">Last Modified</th>
            <th scope="col" @click="handleSort('title')">Title</th>
            <th scope="col" @click="handleSort('location')">Location</th>
            <th scope="col" @click="handleSort('status')">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in sortedAndFilteredJobs" :key="job.id">
            <td>{{ job.id }}</td>
            <td>{{ job.created }}</td>
            <td>{{ job.lastModified }}</td>
            <td>{{ job.title }}</td>
            <td>{{ job.location }}</td>
            <td :style="{color: [job.status === 'open' ? 'green' : 'red']}">{{ job.status }}</td>
            <td>
              <button class="btn btn-secondary btn-sm me-2" @click="editJob(job)">Edit</button>
              <button class="btn btn-danger btn-sm me-2" @click="deleteJob(job)">Delete</button>
              <button class="btn btn-info btn-sm" @click="viewApplicants(job.id)">Applicants</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- This part was taken from JobAddEditModal.vue -->
    <transition name="modal" v-if="showModal">
      <div class="modal d-block" tabindex="-1" role="dialog" @click.self="closeModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ jobEditing ? 'Edit Job' : 'Add Job' }}
              </h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submit">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" id="title" v-model="job.title" required />
                </div>
                <div class="mb-3">
                  <label for="location" class="form-label">Location</label>
                  <input type="text" class="form-control" id="location" v-model="job.location" required />
                </div>
                <div class="mb-3">
                  <label for="duration" class="form-label">Duration</label>
                  <input type="text" class="form-control" id="duration" v-model="job.duration" required />
                </div>
                <div class="mb-3">
                  <label for="requirements" class="form-label">Requirements</label>
                  <textarea class="form-control" id="requirements" rows="3" v-model="job.requirements" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" rows="3" v-model="job.description" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="postingDate" class="form-label">Posting Date</label>
                  <input type="date" class="form-control" id="postingDate" v-model="job.postingDate" required />
                </div>
                <div class="mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select class="form-select" id="status" v-model="job.status" required>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary">{{ jobEditing ? 'Update Job' : 'Create Job' }}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useJobsStore } from '../../stores/jobs';
import { useRouter } from 'vue-router';
import admin from '~/middleware/admin.js'
const router = useRouter();
const jobsStore = useJobsStore();
const jobPostings = ref([]);
const jobEditing = ref(null);
const closedJobPostings = ref([]);
definePageMeta({
  middleware: [admin]
}),
watch(() => jobsStore.jobPostings, (newJobPostings) => {
  jobPostings.value = newJobPostings;
});
watch(() => jobsStore.closedJobPostings, (newClosedJobPostings) => {
  closedJobPostings.value = newClosedJobPostings;
});
const combinedJobPostings = computed(() => {
  return [...jobPostings.value, ...closedJobPostings.value];
});
onMounted(async () => {
  await jobsStore.getJobListings();
  await jobsStore.getClosedJobListings();
  jobPostings.value = jobsStore.jobPostings;
});
jobsStore.getJobListings();

const addJob = () => {
  jobEditing.value = null;
  openModal(null);
};

const editJob = (job) => {
  console.log("Editing job with ID:", job.id);
  console.log("here is the job details: ", job);
  jobEditing.value = job;
  openModal(job);
};

const deleteJob = async (jobId) => {
  await jobsStore.deleteJob(jobId);
};

const jobSubmitted = async (job) => {
  showModal.value = false;
  if (job.id) {
    await jobsStore.updateJob(job);
  } else {
    await jobsStore.createJob(job);
  }
  jobEditing.value = null;
};
const viewApplicants = (jobId) => {
  router.push(`/jobPostManagement/${jobId}-applicants`);
};
// JobAddEditModal.vue state and methods
const job = ref({
  id: null,
  title: '',
  location: '',
  duration: '',
  requirements: '',
  description: '',
  postingDate: '',
  status: 'open',
});

const showModal = ref(false);

const openModal = (jobToEdit) => {
  if (jobToEdit) {
    job.value = { ...jobToEdit };
  } else {
    job.value = {
      id: null,
      title: '',
      location: '',
      duration: '',
      requirements: '',
      description: '',
      postingDate: '',
      status: 'open',
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submit = () => {
  if (jobEditing.value) {
    job.value.id = jobEditing.value.id;
    jobSubmitted({ ...job.value });
  } else {
    jobSubmitted({ ...job.value });
  }
  closeModal();
};
const sortBy = ref(null); // Add sort state variable
const sortOrder = ref(null); // Add sort state variable
const filterKeyword = ref(''); // Add filter state variable

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

const sortedAndFilteredJobs = computed(() => {
  let jobs = [...combinedJobPostings.value];

  // Apply the sorting
  if (sortBy.value) {
    jobs.sort((a, b) => {
      const compare = a[sortBy.value] > b[sortBy.value] ? 1 : -1;
      return sortOrder.value === 'asc' ? compare : -compare;
    });
  }

  // Apply the filtering
  if (filterKeyword.value) {
    const keyword = filterKeyword.value.toLowerCase();
    jobs = jobs.filter((job) => {
      return Object.values(job).some((value) =>
        String(value).toLowerCase().includes(keyword)
      );
    });
  }

  return jobs;
});
</script>
