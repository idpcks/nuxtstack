export default defineNuxtRouteMiddleware((to) => {
    const { loggedIn } = useUserSession()
  
    // 1. Aturan untuk area Publik (Halaman Login, Register, dsb)
    if (to.path.startsWith(AppRoutes.AUTH_PREFIX)) {
      // Jika sudah login tapi iseng buka halaman login lagi, kembalikan ke Dasbor!
      if (loggedIn.value) {
        return navigateTo(AppRoutes.DASHBOARD)
      }
      // Biarkan masuk jika memang tamu yang belum login
      return
    }
  
    // 2. Aturan untuk area Terproteksi (Semua halaman selain /auth/)
    if (!loggedIn.value) {
      // Jika belum login, paksa ke halaman login
      return navigateTo(AppRoutes.LOGIN)
    }
})