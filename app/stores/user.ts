import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // State: Data profil yang tersinkronisasi di seluruh aplikasi
  const profile = ref({
    fullName: 'Admin Nuxt',
    email: 'admin@nuxt.com',
    role: 'Super Administrator',
    avatar: ''
  })

  // Actions: Fungsi untuk memodifikasi state
  const updateProfile = (data: { fullName: string; email: string }) => {
    profile.value.fullName = data.fullName
    profile.value.email = data.email
    
    // Nanti di masa depan, kita bisa memanggil API backend di sini:
    // await $fetch('/api/user/profile', { method: 'PUT', body: data })
  }

  return {
    profile,
    updateProfile
  }
})
