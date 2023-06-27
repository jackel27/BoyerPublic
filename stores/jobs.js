// Import required libraries and methods
import { defineStore } from 'pinia';
import { db, addDoc, getDocs, collection, doc, getDoc, setDoc, where, Timestamp, updateDoc, deleteDoc, query } from '../includes/firebase';

// Define the store
export const useJobsStore = defineStore('jobs', {
  // Define the state of the store
  state: () => ({
    jobPostings: [],
    closedJobPostings: []
  }),
  actions: {
    // Action to get a job by its ID
    async getJobById(jobId) {
      // Get reference to the job document
      const jobDocRef = doc(db, 'jobPostings', jobId);
      // Retrieve the document snapshot
      const jobDocSnapshot = await getDoc(jobDocRef);
      // If the document exists, return the data
      if (jobDocSnapshot.exists()) {
        return { id: jobDocSnapshot.id, ...jobDocSnapshot.data() };
      } else {
        return null;
      }
    },
    // Action to get all job listings
    async getJobListings() {
      // Get reference to the jobPostings collection
      const jobListingsSnapshot = await getDocs(collection(db, 'jobPostings'));
      // Map the documents to the data payload
      this.jobPostings = jobListingsSnapshot.docs.map((doc) => {
        // Get the document data
        const data = doc.data();
        data.id = doc.id;
        data.created = data.created ? data.created : '';
        // Convert 'created' and 'lastModified' Timestamps to Dates
        data.lastModified = data.lastModified ? data.lastModified.toDate().toLocaleDateString() : data.created.toDate().toLocaleDateString() ;
        return data;
      });
    },
    // Action to get all closed job listings
    async getClosedJobListings() {
      // Get reference to the closedJobs collection
      const closedJobListingsSnapshot = await getDocs(collection(db, 'closedJobs'));
      // Map the documents to the data payload
      this.closedJobPostings = closedJobListingsSnapshot.docs.map((doc) => {
        // Get the document data
        const data = doc.data();
        data.id = doc.id;
        // Convert 'created' and 'lastModified' Timestamps to Dates
        data.created = data.created ? data.created : '';
        data.lastModified = data.lastModified ? data.lastModified.toDate().toLocaleDateString() : data.created.toDate().toLocaleDateString() ;
        return data;
      });
    },
    // Action to create a new job listing
    async createJob(job) {
      // Get reference to the jobPostings collection
      const docRef = doc(collection(db, 'jobPostings'));
      // Add the 'created' and 'lastModified' fields with the current Firestore server time
      const jobWithTimestamps = { ...job, created: Timestamp.now(), lastModified: Timestamp.now() };
      // Add the job to the collection
      await setDoc(docRef, jobWithTimestamps);
      // Get the updated job listings
      await this.getJobListings();
    },
    // Action to update a job listing
    async updateJob(job) {
      // Get reference to the job document
      const openJobRef = doc(db, 'jobPostings', job.id);
      const closedJobRef = doc(db, 'closedJobs', job.id);
      // Add the 'lastModified' field with the current Firestore server time
      const jobWithLastModified = { ...job, lastModified: Timestamp.now() };
      
      // If the job status is 'closed', move the job to the 'closedJobs' collection
      if (job.status === 'closed') {
        // Move the job to the 'closedJobs' collection
        await setDoc(closedJobRef, jobWithLastModified);
        // Remove the job from the 'jobPostings' collection
        await deleteDoc(openJobRef);
      } else {
        // Move the job back to the 'jobPostings' collection
        // Move the job back to the 'jobPostings' collection
        await setDoc(openJobRef, jobWithLastModified);
        // Remove the job from the 'closedJobs' collection
        await deleteDoc(closedJobRef);
      }
      // Get the updated job listings
      await this.getJobListings();
      // Get the updated closed job listings
      await this.getClosedJobListings();
    },
    // Action to delete a job listing
    async deleteJob(jobId) {
      // Get reference to the job document
      const docRef = doc(db, 'jobPostings', jobId);
      // Delete the job
      await deleteDoc(docRef);
      // Get the updated job listings
      await this.getJobListings();
    },
    // Action to get all applicants
    async hasUserAppliedForJob(userId, jobId) {
      // Get reference to the applicants collection
      const appRef = collection(db, 'applicants');
      // Get all documents where the userId and jobId match
      const appQuery = query(appRef, where('userId', '==', userId), where('jobId', '==', jobId));
      const querySnapshot = await getDocs(appQuery);
      // Return true if the query snapshot has any documents
      console.log('query snapshot docs length: ', querySnapshot.docs.length)
      return querySnapshot.docs.length > 0;
    },
    // Action to get all applicants
    async getApplicantsByJobId(jobId) {
      // Get reference to the applicants collection
      const applicantsSnapshot = await getDocs(collection(db, 'applicants'));
      // Map the documents to the data payload
      const applicants = applicantsSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        })
        .filter((applicant) => applicant.jobId === jobId);
      return applicants;
    },
    // Action to get all applicants
    async applyForJob(application) {
      const appRef = collection(db, 'applicants');
      // Add the 'dateApplied' field with the current Firestore server time
      const appWithTimestamp = { ...application, dateApplied: Timestamp.now() };
      // Add the application to the collection
      await addDoc(appRef, appWithTimestamp);
    }
  }
});