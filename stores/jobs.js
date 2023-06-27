import { defineStore } from 'pinia';
import { db, addDoc, getDocs, collection, doc, getDoc, setDoc, where, Timestamp, updateDoc, deleteDoc, query } from '../includes/firebase';
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobPostings: [],
    closedJobPostings: []
  }),
  actions: {
    async getJobById(jobId) {
      const jobDocRef = doc(db, 'jobPostings', jobId);
      const jobDocSnapshot = await getDoc(jobDocRef);
      if (jobDocSnapshot.exists()) {
        return { id: jobDocSnapshot.id, ...jobDocSnapshot.data() };
      } else {
        return null;
      }
    },
    async getJobListings() {
      const jobListingsSnapshot = await getDocs(collection(db, 'jobPostings'));
      this.jobPostings = jobListingsSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        // Convert 'created' and 'lastModified' Timestamps to Dates
        data.created = data.created ? data.created : '';
        data.lastModified = data.lastModified ? data.lastModified.toDate().toLocaleDateString() : data.created.toDate().toLocaleDateString() ;
        return data;
      });
    },
    async getClosedJobListings() {
      const closedJobListingsSnapshot = await getDocs(collection(db, 'closedJobs'));
      this.closedJobPostings = closedJobListingsSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        // Convert 'created' and 'lastModified' Timestamps to Dates
        data.created = data.created ? data.created : '';
        data.lastModified = data.lastModified ? data.lastModified.toDate().toLocaleDateString() : data.created.toDate().toLocaleDateString() ;
        return data;
      });
    },
    async createJob(job) {
      const docRef = doc(collection(db, 'jobPostings'));
      // Add the 'created' and 'lastModified' fields with the current Firestore server time
      const jobWithTimestamps = { ...job, created: Timestamp.now(), lastModified: Timestamp.now() };
      
      await setDoc(docRef, jobWithTimestamps);
      await this.getJobListings();
    },
    async updateJob(job) {
      const openJobRef = doc(db, 'jobPostings', job.id);
      const closedJobRef = doc(db, 'closedJobs', job.id);
      // Add the 'lastModified' field with the current Firestore server time
      const jobWithLastModified = { ...job, lastModified: Timestamp.now() };
      
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

      await this.getJobListings();
      await this.getClosedJobListings();
    },
    async deleteJob(jobId) {
      const docRef = doc(db, 'jobPostings', jobId);
      await deleteDoc(docRef);
      await this.getJobListings();
    },
    async hasUserAppliedForJob(userId, jobId) {
      const appRef = collection(db, 'applicants');
      const appQuery = query(appRef, where('userId', '==', userId), where('jobId', '==', jobId));
      const querySnapshot = await getDocs(appQuery);
      console.log('query snapshot docs length: ', querySnapshot.docs.length)
      return querySnapshot.docs.length > 0;
    },
    async getApplicantsByJobId(jobId) {
      const applicantsSnapshot = await getDocs(collection(db, 'applicants'));
      const applicants = applicantsSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        })
        .filter((applicant) => applicant.jobId === jobId);
      return applicants;
    },
    async applyForJob(application) {
      const appRef = collection(db, 'applicants');
      const appWithTimestamp = { ...application, dateApplied: Timestamp.now() };
      
      await addDoc(appRef, appWithTimestamp);
    }
    // Other actions for submitting applications, etc.
  },
});