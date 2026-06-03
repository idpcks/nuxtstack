export default defineNuxtRouteMiddleware(() => {
    const { loggedIn } = useUserSession()
  
    // Kalau belum login, redirect ke halaman login
    if (!loggedIn.value) {
      return navigateTo('/auth/login')
    }
  })