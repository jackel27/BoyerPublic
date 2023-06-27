import './includes/firebase.js';

export default defineNuxtConfig({
  // this config is for the server, so it will not be used in the client, so it's safe to use the import here. 
  // If you want to use it in the client, you need to use the dynamic import
  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr
  // also, you need to use the `mode: 'client'` option in the plugin
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
