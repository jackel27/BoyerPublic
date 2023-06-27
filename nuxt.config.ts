import './includes/firebase.js';

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss', "bootstrap/dist/css/bootstrap.min.css", "~/assets/css/global-variables.css"],
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  },
  vite: {
    // You may have other Vite configurations here
    assetsInclude: ['**/*.MP4', '**/*.webm'],
  },
  plugins: [
    { src: '~/plugins/auth', mode: 'client' },
    { src: '~/plugins/useBootstrap.client.ts', mode: 'client' },
    { src: '~/plugins/scroll-behavior.client.ts', mode: 'client' }
  ],
  ssr: false
})
