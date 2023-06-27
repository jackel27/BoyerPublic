<template>
  <div class="container mt-4">
    <h2 v-if="!state.appliedForJob" class="text-center mb-4">Apply for {{ job.title }}</h2>
    <div class="text-center my-4">
      <nuxt-link to="/jobs" class="btn btn-secondary">
        Go back to Jobs page
      </nuxt-link>
    </div>
    <form v-if="!state.appliedForJob" @submit.prevent="submitApplication">
      <!-- Applicant Information -->
      <h3 class="mb-3">Applicant Information</h3>
      <div class="form-group row">
        <div class="col-md-4 mb-3">
          <label>Last Name</label>
          <input type="text" class="form-control" v-model="application.lastName">
        </div>
        <div class="col-md-4 mb-3">
          <label>First Name</label>
          <input type="text" class="form-control" v-model="application.firstName">
        </div>
        <div class="col-md-4 mb-3">
          <label>Middle Initial</label>
          <input type="text" class="form-control" v-model="application.middleInitial">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-6 mb-3">
          <label>Street Address</label>
          <input type="text" class="form-control" v-model="application.streetAddress">
        </div>
        <div class="col-md-6 mb-3">
          <label>Apartment/Unit #</label>
          <input type="text" class="form-control" v-model="application.aptUnit">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-4 mb-3">
          <label>City</label>
          <input type="text" class="form-control" v-model="application.city">
        </div>
        <div class="col-md-4 mb-3">
          <label>State</label>
          <input type="text" class="form-control" v-model="application.state">
        </div>
        <div class="col-md-4 mb-3">
          <label>ZIP</label>
          <input type="text" class="form-control" v-model="application.zip">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-4 mb-3">
          <label>Phone</label>
          <input type="text" class="form-control" v-model="application.phone">
        </div>
        <div class="col-md-4 mb-3">
          <label>Cell/message phone</label>
          <input type="text" class="form-control" v-model="application.cellPhone">
        </div>
        <div class="col-md-4 mb-3">
          <label>Email Address</label>
          <input type="email" class="form-control" v-model="application.email">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-4 mb-3">
          <label>Date Available</label>
          <input type="date" class="form-control" v-model="application.dateAvailable">
        </div>
        <div class="col-md-4 mb-3">
          <label>SS#</label>
          <input type="text" class="form-control" v-model="application.socialSecurity">
        </div>
        <div class="col-md-4 mb-3">
          <label>Desired Salary</label>
          <input type="number" class="form-control" v-model="application.desiredSalary">
        </div>
      </div>
      <div class="form-group row">
        <!-- Position applied for will autofill -->
        <div class="col-md-6 mb-3">
          <label>Position applied for</label>
          <input type="text" class="form-control" v-model="application.position" readonly>
        </div>
      </div>
    <!-- Additional fields -->
      <!-- Additional fields -->
      <h3 class="mb-3">Additional Information</h3>
      <div class="form-group mb-3">
        <label>Are you a citizen of the United States?</label>
        <div class="d-flex flex-wrap align-items-center">
          <div class="form-check-inline mr-3">
            <input type="radio" id="isUSCitizenYes" class="form-check-input" name="isUSCitizen" value="yes" v-model="application.isUSCitizen">
            <label class="form-check-label" for="isUSCitizenYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input type="radio" id="isUSCitizenNo" class="form-check-input" name="isUSCitizen" value="no" v-model="application.isUSCitizen">
            <label class="form-check-label" for="isUSCitizenNo">No</label>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label>Can you pass a drug test?</label>
        <div class="d-flex flex-wrap align-items-center">
          <div class="form-check-inline mr-3">
            <input type="radio" id="canPassDrugTestYes" class="form-check-input" name="canPassDrugTest" value="yes" v-model="application.canPassDrugTest">
            <label class="form-check-label" for="canPassDrugTestYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input type="radio" id="canPassDrugTestNo" class="form-check-input" name="canPassDrugTest" value="no" v-model="application.canPassDrugTest">
            <label class="form-check-label" for="canPassDrugTestNo">No</label>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label>Have you ever worked for Boyer Towing?</label>
        <div class="d-flex flex-wrap align-items-center">
          <div class="form-check-inline mr-3">
            <input type="radio" id="hasWorkedBeforeYes" class="form-check-input" name="hasWorkedBefore" value="yes" v-model="application.hasWorkedBefore">
            <label class="form-check-label" for="hasWorkedBeforeYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input type="radio" id="hasWorkedBeforeNo" class="form-check-input" name="hasWorkedBefore" value="no" v-model="application.hasWorkedBefore">
            <label class="form-check-label" for="hasWorkedBeforeNo">No</label>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label>Do you have a current passport?</label>
        <div class="d-flex flex-wrap align-items-center">
          <div class="form-check-inline mr-3">
            <input type="radio" id="hasPassportYes" class="form-check-input" name="hasPassport" value="yes" v-model="application.hasPassport">
            <label class="form-check-label" for="hasPassportYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input type="radio" id="hasPassportNo" class="form-check-input" name="hasPassport" value="no" v-model="application.hasPassport">
            <label class="form-check-label" for="hasPassportNo">No</label>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label>Do you get seasick?</label>
        <div class="d-flex flex-wrap align-items-center">
          <div class="form-check-inline mr-3">
            <input type="radio" id="getsSeasickYes" class="form-check-input" name="getsSeasick" value="yes" v-model="application.getsSeasick">
            <label class="form-check-label" for="getsSeasickYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input type="radio" id="getsSeasickNo" class="form-check-input" name="getsSeasick" value="no" v-model="application.getsSeasick">
            <label class="form-check-label" for="getsSeasickNo">No</label>
          </div>
        </div>
      </div>
    
    <!-- Education section -->
    <h3 class="mb-3">Education</h3>
    <!-- Same structure for High School, College, and Other -->
    <div class="form-group row">
      <div class="col-md-4 mb-3">
        <label>Highschool</label>
        <input type="text" class="form-control" v-model="application.education.highschool.name">
      </div>
      <div class="col-md-4 mb-3">
        <label>Address</label>
        <input type="text" class="form-control" v-model="application.education.highschool.address">
      </div>
      <div class="form-group row">
        <div class="col-md-4 mb-3">
          <label>Did you graduate?</label>
          <div class="form-check-inline">
            <input type="radio" id="highschoolGraduatedYes" class="form-check-input" name="highschoolGraduated" value="yes" v-model="application.education.highschool.graduated">
            <label class="form-check-label" for="highschoolGraduatedYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input type="radio" id="highschoolGraduatedNo" class="form-check-input" name="highschoolGraduated" value="no" v-model="application.education.highschool.graduated">
            <label class="form-check-label" for="highschoolGraduatedNo">No</label>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label>Degree</label>
        <input type="text" class="form-control" v-model="application.education.highschool.degree">
      </div>
      <div class="col-md-4 mb-3">
        <label>From</label>
        <input type="date" class="form-control" v-model="application.education.highschool.from">
      </div>
      <div class="col-md-4 mb-3">
        <label>To</label>
        <input type="date" class="form-control" v-model="application.education.highschool.to">
      </div>
    </div>

    <!-- You can add College and Other education sections following the same structure -->

    <!-- References section -->
    <h3 class="mb-3">References</h3>
    <div class="">
      <div class="form-group row" v-for="(reference, index) in application.references" :key="index">
        <h5 class="">Reference {{ index + 1 }}</h5>
        <div class="col-md-4 mb-3">
          <label>Full name</label>
          <input type="text" class="form-control" v-model="reference.name">
        </div>
        <div class="col-md-4 mb-3">
          <label>Relationship</label>
          <input type="text" class="form-control" v-model="reference.relationship">
        </div>
        <div class="col-md-4 mb-3">
          <label>Company</label>
          <input type="text" class="form-control" v-model="reference.company">
        </div>
        <div class="col-md-4 mb-3">
          <label>Phone</label>
          <input type="text" class="form-control" v-model="reference.phone">
        </div>
        <div class="col-md-4 mb-3">
          <label>Address</label>
          <input type="text" class="form-control" v-model="reference.address">
        </div>
      </div>
    </div>

    <!-- You can add two more reference sections following the same structure -->

    <!-- Previous Employment section -->
    <h3 class="mb-3">Previous Employment</h3>
    <!-- Same structure for three previous employments -->
    <div class="form-group row" v-for="(previousEmployment, index) in application.previousEmployment" :key="index">
      <h5 class="">Previous Employement {{ index + 1 }}</h5>
      <div class="col-md-4 mb-3">
        <label>Company</label>
        <input type="text" class="form-control" v-model="previousEmployment.company">
      </div>
      <div class="col-md-4 mb-3">
        <label>Phone</label>
        <input type="text" class="form-control" v-model="previousEmployment.phone">
      </div>
      <div class="col-md-4 mb-3">
        <label>Address</label>
        <input type="text" class="form-control" v-model="previousEmployment.address">
      </div>
      <div class="col-md-4 mb-3">
        <label>Supervisor</label>
        <input type="text" class="form-control" v-model="previousEmployment.supervisor">
      </div>
      <div class="col-md-4 mb-3">
        <label>Job Title</label>
        <input type="text" class="form-control" v-model="previousEmployment.jobTitle">
      </div>
      <div class="col-md-4 mb-3">
        <label>Starting Salary</label>
        <input type="number" class="form-control" v-model="previousEmployment.startingSalary">
      </div>
      <div class="col-md-4 mb-3">
        <label>Ending Salary</label>
        <input type="number" class="form-control" v-model="previousEmployment.endingSalary">
      </div>
      <div class="col-md-4 mb-3">
        <label>Responsibilities</label>
        <input type="text" class="form-control" v-model="previousEmployment.responsibilities">
      </div>
      <div class="col-md-4 mb-3">
        <label>From</label>
        <input type="date" class="form-control" v-model="previousEmployment.from">
      </div>
      <div class="col-md-4 mb-3">
        <label>To</label>
        <input type="date" class="form-control" v-model="previousEmployment.to">
      </div>
      <div class="col-md-4 mb-3">
        <label>Reason for Leaving</label>
        <input type="text" class="form-control" v-model="previousEmployment.reasonForLeaving">
      </div>
      <div class="form-group">
        <label>May we Contact Supervisor?</label>
        <div class="form-check-inline">
          <input type="radio" id="contactSupervisorYes" class="form-check-input" name="contactSupervisor" value="yes" v-model="previousEmployment.contactSupervisor">
          <label class="form-check-label" for="contactSupervisorYes">Yes</label>
        </div>
        <div class="form-check-inline">
          <input type="radio" id="contactSupervisorNo" class="form-check-input" name="contactSupervisor" value="no" v-model="previousEmployment.contactSupervisor">
          <label class="form-check-label" for="contactSupervisorNo">No</label>
        </div>
      </div>
    </div>
    <!-- You can add two more previous employment sections following the same structure -->

    <!-- Disclaimer and submit -->
      <!-- Military Service section -->
      <h3 class="mb-3">Military Service</h3>
        <div class="form-group row">
          <div class="col-md-4 mb-3">
            <label>Branch</label>
            <input type="text" class="form-control" v-model="application.militaryService.branch">
          </div>
          <div class="col-md-4 mb-3">
            <label>From</label>
            <input type="date" class="form-control" v-model="application.militaryService.from">
          </div>
          <div class="col-md-4 mb-3">
            <label>To</label>
            <input type="date" class="form-control" v-model="application.militaryService.to">
          </div>
          <div class="col-md-4 mb-3">
            <label>Rank at Discharge</label>
            <input type="text" class="form-control" v-model="application.militaryService.rankAtDischarge">
          </div>
          <div class="col-md-4 mb-3">
            <label>Type of Discharge</label>
            <input type="text" class="form-control" v-model="application.militaryService.typeOfDischarge">
          </div>
        </div>

        <!-- Special Training / Skills / Licenses -->
        <h3 class="mb-3">Special Training / Skills / Licenses</h3>
        <div class="form-group">
          <textarea class="form-control" rows="3" v-model="application.specialTrainingSkillsLicenses"></textarea>
        </div>

        <!-- Disclaimer -->
        <h3 class="mb-3">Disclaimer</h3>
        <div class="form-group">
          <div class="form-check-custom">
            <label class="form-check-label" for="disclaimerAccepted">
              By submitting this application, I certify that all information provided herein is accurate and complete to the best of my knowledge. I understand that any misrepresentation or omission of facts may result in the company disqualifying my application or, if employed, terminating my employment. I authorize the company to investigate all statements contained in this application, including but not limited to, my employment history, educational background, and any other relevant information. I further consent to the collection, storage, and use of my personal data in the company's database for hiring purposes and future recruitment processes. I also authorize the company to contact my listed references, former employers, or any other relevant third parties to obtain additional information regarding my qualifications and work experiences.
              <input type="checkbox" id="disclaimerAccepted" class="form-check-input" v-model="application.disclaimerAccepted">
            </label>
          </div>
        </div>
        
        <button class="btn btn-primary" v-on:click="submitApplication" :disabled="!application.disclaimerAccepted">Submit</button>
    </form>
    <h1 v-else>You have already applied for {{ job.title }}. You can not apply more than once to the same position.</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useJobsStore } from '../../stores/jobs';
import { useAuthStore } from '../../stores/auth';

const state = reactive({
  appliedForJob: false,
  isLoading: true
});
const jobsStore = useJobsStore();
const router = useRouter();
const authStore = useAuthStore();
const job = ref({});
const application = ref({
  // set all the application fields here
  userId: authStore.user.uid || null,
  jobId: router.currentRoute.value.params.id,
  firstName: '',
  lastName: '',
  middleInitial: '',
  streetAddress: '',
  aptUnit: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  cellPhone: '',
  email: '',
  dateAvailable: '',
  socialSecurity: '',
  desiredSalary: '',
  position: '',
  citizen: false,
  passDrugTest: false,
  workedForCompany: false,
  hasCurrentPassport: false,
  getSeasick: false,
  education: {
    highschool: {
      name: '',
      address: '',
      from: '',
      to: '',
      graduate: false,
      degree: ''
    },
    college: {
      name: '',
      address: '',
      from: '',
      to: '',
      graduate: false,
      degree: ''
    },
    other: {
      name: '',
      address: '',
      from: '',
      to: '',
      graduate: false,
      degree: ''
    }
  },
  references: [
    { fullName: '', relationship: '', company: '', phone: '', address: '' },
    { fullName: '', relationship: '', company: '', phone: '', address: '' },
    { fullName: '', relationship: '', company: '', phone: '', address: '' },
  ],
  previousEmployment: [
    { company: '', phone: '', address: '', supervisor: '', jobTitle: '', startingSalary: '', endingSalary: '', responsibilities: '', from: '', to: '', reasonForLeaving: '', contactSupervisor: false },
    { company: '', phone: '', address: '', supervisor: '', jobTitle: '', startingSalary: '', endingSalary: '', responsibilities: '', from: '', to: '', reasonForLeaving: '', contactSupervisor: false },
    { company: '', phone: '', address: '', supervisor: '', jobTitle: '', startingSalary: '', endingSalary: '', responsibilities: '', from: '', to: '', reasonForLeaving: '', contactSupervisor: false }
  ],
  militaryService: {
    branch: '',
    from: '',
    to: '',
    rankAtDischarge: '',
    typeOfDischarge: ''
  },
  specialTrainingSkillsLicenses: '',
  disclaimerAccepted: false
});

onMounted(async () => {
  // get the job
  const fetchedJob = await jobsStore.getJobById(router.currentRoute.value.params.id);
  job.value = fetchedJob;
  application.value.position = fetchedJob.title;
  getUserInfo();

  state.appliedForJob = await jobsStore.hasUserAppliedForJob(authStore.user.uid, job.value.id);
  state.isLoading = false;
});
const submitApplication = async () => {
  // submit the application
  if (authStore.user) {
    await jobsStore.applyForJob(application.value);
    // router.push('/jobs');
  }
}
const getUserInfo = () => {
  // get the user info
  if (authStore.user) {
    authStore.getUserProfile(authStore.user).then((user) => {
      application.value.firstName = user.firstName || '';
      application.value.lastName = user.lastName || '';
      application.value.email = user.email || '';
      application.value.phone = user.phone || '';
      application.value.cellPhone = user.phone || '';
    })
  }
}
</script>
<style scoped>
.form-check-input {
  width: 24px;
  height: 24px;
  margin-top: 0;
}

.form-check-custom {
  display: block;
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: inherit;
}
.form-check-label {
  margin-bottom: 0;
  font-size: 1rem;
  cursor: pointer;
  padding-left: 1em;
}
@media (max-width: 767px) {
  .form-group {
    margin-bottom: 1.5rem;
  }
}
.contact-supervisor-box {
  margin-top: .50em;
}
</style>