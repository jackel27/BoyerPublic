<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Applicant Details</h2>
    <div v-if="applicant">
      <!-- Personal Details -->
      <div class="row mb-4 page-section">
        <div class="col-md-12">
          <h4>Personal Details</h4>
        </div>
        <div class="col-md-4">
          <p><strong>First Name:</strong> {{ applicant.firstName }}</p>
          <p><strong>Middle Initial:</strong> {{ applicant.middleInitial }}</p>
          <p><strong>Last Name:</strong> {{ applicant.lastName }}</p>
        </div>
        <div class="col-md-4">
          <p><strong>Email:</strong> {{ applicant.email }}</p>
          <p><strong>Phone:</strong> {{ applicant.phone }}</p>
          <p><strong>Cell Phone:</strong> {{ applicant.cellPhone }}</p>
        </div>
        <div class="col-md-4">
          <p><strong>Position:</strong> {{ applicant.position }}</p>
          <p><strong>Date Applied:</strong> {{ new Date(applicant.dateApplied.seconds * 1000).toLocaleDateString() }}</p>
        </div>
      </div>

      <hr />
      
      <!-- Address Details -->
      <div class="row mb-4 page-section">
        <div class="col-md-12">
          <h4>Address</h4>
        </div>
        <div class="col-md-6">
          <p><strong>Street:</strong> {{ applicant.streetAddress }}</p>
          <p><strong>Apt/Unit:</strong> {{ applicant.aptUnit }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>City:</strong> {{ applicant.city }}</p>
          <p><strong>State:</strong> {{ applicant.state }}</p>
          <p><strong>ZIP:</strong> {{ applicant.zip }}</p>
        </div>
      </div>
      
      <hr />

      <!-- Citizenship and Passport Details -->
      <div class="row mb-4 page-section">
        <div class="col-md-12">
          <h4>Citizenship and Passport Details</h4>
        </div>
        <div class="col-md-6">
          <p><strong>US Citizen:</strong> {{ applicant.isUSCitizen }}</p>
          <p><strong>Has Worked Before:</strong> {{ applicant.hasWorkedBefore }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Passport:</strong> {{ applicant.hasCurrentPassport ? 'Yes' : 'No' }}</p>
          <p><strong>Can Pass Drug Test:</strong> {{ applicant.passDrugTest ? 'Yes' : 'No' }}</p>
        </div>
      </div>
      
      <hr />

      <!-- Education Details -->
      <div class="row mb-4 page-section">
        <div class="col-md-12">
          <h4>Education</h4>
        </div>
        <div class="col-md-4" v-for="(eduDetail, eduKey) in applicant.education" :key="eduKey">
          <h5>{{ eduKey.charAt(0).toUpperCase() + eduKey.slice(1) }}</h5>
          <p><strong>Name:</strong> {{ eduDetail.name }}</p>
          <p><strong>Degree:</strong> {{ eduDetail.degree }}</p>
          <p><strong>From:</strong> {{ eduDetail.from }}</p>
          <p><strong>To:</strong> {{ eduDetail.to }}</p>
          <p><strong>Graduated:</strong> {{ eduDetail.graduated }}</p>
        </div>
      </div>

      <!-- Military Service Details -->
      <div class="row mb-4 page-section">
          <div class="col-md-12">
              <h4>Military Service</h4>
          </div>
          <div class="col-md-6">
              <p><strong>Branch:</strong> {{ applicant.militaryService.branch }}</p>
              <p><strong>From:</strong> {{ applicant.militaryService.from }}</p>
              <p><strong>To:</strong> {{ applicant.militaryService.to }}</p>
          </div>
          <div class="col-md-6">
              <p><strong>Type of Discharge:</strong> {{ applicant.militaryService.typeOfDischarge }}</p>
              <p><strong>Rank at Discharge:</strong> {{ applicant.militaryService.rankAtDischarge }}</p>
          </div>
      </div>

      <hr />

      <!-- Previous Employment Details -->
      <div class="row mb-4 page-section">
          <div class="col-md-12">
              <h4>Previous Employment</h4>
          </div>
          <div class="col-md-12" v-for="(job, index) in applicant.previousEmployment" :key="index">
              <h5>Job {{ index + 1 }}</h5>
              <p><strong>Company:</strong> {{ job.company }}</p>
              <p><strong>Job Title:</strong> {{ job.jobTitle }}</p>
              <p><strong>From:</strong> {{ job.from }}</p>
              <p><strong>To:</strong> {{ job.to }}</p>
              <p><strong>Starting Salary:</strong> {{ job.startingSalary }}</p>
              <p><strong>Ending Salary:</strong> {{ job.endingSalary }}</p>
              <p><strong>Supervisor:</strong> {{ job.supervisor }}</p>
              <p><strong>Reason for Leaving:</strong> {{ job.reasonForLeaving }}</p>
              <p><strong>Contact Supervisor:</strong> {{ job.contactSupervisor ? 'Yes' : 'No' }}</p>
          </div>
      </div>

      <hr />

      <!-- References -->
      <div class="row mb-4 page-section">
          <div class="col-md-12">
              <h4>References</h4>
          </div>
          <div class="col-md-12" v-for="(reference, index) in applicant.references" :key="index">
              <h5>Reference {{ index + 1 }}</h5>
              <p><strong>Name:</strong> {{ reference.fullName }}</p>
              <p><strong>Company:</strong> {{ reference.company }}</p>
              <p><strong>Phone:</strong> {{ reference.phone }}</p>
              <p><strong>Relationship:</strong> {{ reference.relationship }}</p>
          </div>
      </div>

      <hr />

      <!-- Additional Information -->
      <div class="row mb-4 page-section">
          <div class="col-md-12">
              <h4>Additional Information</h4>
          </div>
          <div class="col-md-6">
              <p><strong>Desired Salary:</strong> {{ applicant.desiredSalary }}</p>
              <p><strong>Date Available:</strong> {{ applicant.dateAvailable }}</p>
          </div>
          <div class="col-md-6">
              <p><strong>Special Training Skills Licenses:</strong> {{ applicant.specialTrainingSkillsLicenses }}</p>
              <p><strong>Gets Seasick:</strong> {{ applicant.getSeasick ? 'Yes' : 'No' }}</p>
          </div>
      </div>
      <!-- Disclaimer/Agreement and Signatures -->
      <div class="row mb-4 page-section">
          <div class="col-md-12">
              <h4>Disclaimer/Agreement</h4>
              <p>
              I certify that all information provided in this employment application is true and complete. 
              I understand that any false information or omission may disqualify me from further consideration for employment 
              and may result in my dismissal if discovered at a later date.
              </p>
              <p>
              I authorize the investigation of any or all statements contained in this application. 
              I also authorize, whether listed or not, any person, school, current employer, past employers, 
              and organizations to provide relevant information and opinions that may be useful in making a hiring decision. 
              I release such persons and organizations from any legal liability in making such statements.
              </p>
              <p>
              I understand I may be subject to a background check and that future employment may be dependent on the successful 
              passage of such a check. 
              </p>
              <p>
              I understand that Boyer Towing does not sell or otherwise disclose this application data for any purpose not 
              directly related to the hiring process.
              </p>
          </div>
          <div class="col-md-12 mt-4">
              <p><strong>Social Security Number:</strong> {{ applicant.socialSecurity ? applicant.socialSecurity : '_________-_______-__________' }}</p>
              <br><br>
              <div class="d-flex justify-content-between">
                <p><strong>Signature:</strong> ________________________________________________________________</p>
                  <p><strong>Date:</strong>  __________________________________</p>
              </div>
              <p><small>(Sign and date above upon printing the form)</small></p>
          </div>
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-12 text-center">
        <button class="btn btn-primary" @click="printPDF">Save as PDF</button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { jsPDF } from "jspdf"; // You'll need to install this via npm install jspdf
import html2canvas from 'html2canvas'; // And this via npm install html2canvas
export default {
  setup() {
    const applicant = ref(null);
    const route = useRoute();

    onMounted(() => {
      // Get the applicant data from the query string
      const applicantData = route.query.applicant
        ? JSON.parse(decodeURIComponent(route.query.applicant))
        : null;
      applicant.value = applicantData;
    });
    const printPDF = () => {
      // Create a new PDF document, loop through each section of the page, and add it to the PDF, then save it. 
      // Work in progress. need to refine the layout of the saved pdf from the html2canvas
      const pdf = new jsPDF('p', 'mm', 'a4');
      const sections = document.querySelectorAll('.page-section');
      let promises = [];

      sections.forEach((section, index) => {
        // Add a page break between each section
        promises.push(
          html2canvas(section).then(canvas => {
            // Get the image data from the canvas and add it to the PDF
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            if(index !== 0){
              pdf.addPage();
            }
            // Add the image to the PDF, and set the width and height to the page size, so it fills the page.
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          })
        );
      });
      // Once all the sections have been added to the PDF, save it.
      Promise.all(promises).then(() => pdf.save("download.pdf"));
    };

    // Return the applicant data and the printPDF function to the template
    return { applicant, printPDF };
  },
};
</script>

<style scoped>
/* Add any required styling here */
</style>
