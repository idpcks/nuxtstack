/**
 * Kumpulan Endpoint URL untuk Real Backend API
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string | number) => `/users/${id}`,
  },
  ROLES: {
    BASE: '/roles',
    BY_ID: (id: string | number) => `/roles/${id}`,
  },
  PERMISSIONS: {
    BASE: '/permissions',
    BY_ID: (id: string | number) => `/permissions/${id}`,
  },
} as const

/**
 * Kumpulan Endpoint URL untuk Nuxt Local API (BFF Proxy)
 */
export const BFF_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/_auth/session',
  },
  PROFILE: {
    UPDATE: '/api/user/profile'
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string | number) => `/api/users/${id}`,
  },
  ROLES: {
    BASE: '/api/roles',
    BY_ID: (id: string | number) => `/api/roles/${id}`,
  },
  PERMISSIONS: {
    BASE: '/api/permissions',
    BY_ID: (id: string | number) => `/api/permissions/${id}`,
  },
} as const
