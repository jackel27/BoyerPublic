// middleware/admin.js
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { auth, onAuthStateChanged } from '~/includes/firebase'

export default defineNuxtRouteMiddleware((to, from) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      console.log('auth current user is: ', user)
      if (user) {
        const uid = user.uid;
        const adminUid = "dXqaaNxc7JSxcgr7Av0b6kpf8fu1"; // Replace with your admin's UID

        if (uid !== adminUid && to.path === '/JobPostManagement') {
          resolve(navigateTo('/'))
        } else {
          resolve()
        }
      } else {
        resolve(navigateTo('/login'))
      }
    })
  })
})
