<template>
  <div>
    <section class="banner-image" :class="{ 'has-video': !isMobile }">
      <video
        v-if="!isMobile"
        ref="vidRef"
        class="bg-video"
        autoplay
        loop
        muted
        playsinline
        poster="~/assets/images/tugboat-banner.jpg"
        playbackRate="0.5"
      >
        <source src="~/assets/video/vid1.MP4" type="video/mp4">
      </video>
      <div class="text-center text-white banner-text d-flex flex-column justify-content-center align-items-center">
        <h1 class="display-3 text-uppercase mb-3">Boyer Towing</h1>
        <h2 class="mb-4">Building maritime success since 1920's</h2>
        <p class="lead">Providing the best tugboat services for your maritime needs</p>
        <div class="mt-4">
            <nuxt-link to="/jobs" class="btn btn-lg btn-primary mx-1">View job opportunities</nuxt-link>
            <nuxt-link :to="{ hash: '#about' }" class="btn btn-lg btn-warning mx-1">Learn more</nuxt-link>
        </div>
      </div>
    </section>
    <!-- about us section import here from /components/AboutUs.vue -->
    <AboutUs />
    <hr>
    <RecentJobs />
  </div>
</template>

<style scoped>
.banner-image {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url('~/assets/images/tugboat-banner.jpg'); /* Add this line */
  background-position: center; /* Add this line */
  background-repeat: no-repeat; /* Add this line */
  background-size: cover; /* Add this line */
}
.banner-image {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  z-index: 1;
  transform: translate(-50%, -50%);
}

.banner-text {
  position: relative;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
}

.btn {
  background-color: var(--primary-color);
  color: var(--text-light);
}

.btn:hover {
  background-color: var(--tertiary-color);
  color: var(--text-light);
}
</style>

<script setup>
import { ref, onBeforeMount } from 'vue';

const vidRef = ref(null);

onUnmounted(() => {
  // Check if the video exists and is not mobile
  if (!isMobile.value && vidRef.value) {
    // Pause and reset the video when the component is unmounted
    vidRef.value.pause();
    vidRef.value.currentTime = 0;
  }
});
// Detect mobile devices
const isMobile = ref(false);
onBeforeMount(() => {
  // Check if the user agent is a mobile device, and set the isMobile ref accordingly, so we can use it in the template
  const userAgent = navigator.userAgent || navigator.vendor;
  isMobile.value = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
});
</script> 