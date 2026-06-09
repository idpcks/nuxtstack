import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const { user } = useUserSession()

  // State: Data profil yang tersinkronisasi di seluruh aplikasi
  const profile = ref({
    id: 0,
    fullName: '',
    email: '',
    role: '',
    avatar: ''
  })

  // Sinkronisasi otomatis dengan sesi dari BFF
  watch(user, (newUser) => {
    if (newUser) {
      profile.value.id = newUser.id || 0
      profile.value.fullName = newUser.name || ''
      profile.value.email = newUser.email || ''
      profile.value.role = newUser.role || ''
    } else {
      profile.value = { id: 0, fullName: '', email: '', role: '', avatar: '' }
    }
  }, { immediate: true })

  // Actions: Fungsi untuk memodifikasi state
  const updateProfile = (data: { fullName: string; email: string }) => {
    profile.value.fullName = data.fullName
    profile.value.email = data.email
    
    // Nanti di masa depan, kita bisa memanggil API backend di sini:
    // await $fetch(BFF_ENDPOINTS.PROFILE.UPDATE, { method: 'PUT', body: data })
  }

  return {
    profile,
    updateProfile
  }
})
