export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession()

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

  // Pengecekan RBAC (Role-Based Access Control)
  const requiredRoles = to.meta.requiredRoles as string[] | undefined
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = user.value?.role

    // Jika user tidak memiliki role atau rolenya tidak ada di daftar yang diizinkan
    if (!userRole || !requiredRoles.includes(userRole)) {
      // Tolak akses (misalnya lempar ke error page atau ke dashboard)
      return abortNavigation({
        statusCode: 403,
        message: 'Anda tidak memiliki hak akses (role) untuk halaman ini.'
      })
    }
  }
})