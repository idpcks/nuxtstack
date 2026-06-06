/**
 * Sentralisasi seluruh rute aplikasi (Source of Truth).
 * Gunakan variabel ini alih-alih mengetik rute string manual (Magic Strings).
 * Contoh: navigateTo(AppRoutes.LOGIN)
 */
export const AppRoutes = {
  // Prefix/Kategori
  AUTH_PREFIX: '/auth/',

  // Autentikasi
  LOGIN: '/auth/login',
  AUTH_GOOGLE: '/auth/google',

  // Halaman Terproteksi
  DASHBOARD: '/dashboard',
  USERS: '/users',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
  REPORTS: '/reports',
  SETTINGS: '/settings'
} as const;
