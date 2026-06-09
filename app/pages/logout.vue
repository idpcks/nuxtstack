<script setup lang="ts">
const { clear } = useUserSession()

onMounted(async () => {
  try {
    await $fetch(BFF_ENDPOINTS.AUTH.LOGOUT, { method: 'POST' })
  } catch (error) {
    console.warn('Gagal menghapus token di backend, melanjutkan proses logout lokal.')
  }
  
  await clear()
  await navigateTo(AppRoutes.LOGIN)
})

await new Promise(resolve => setTimeout(resolve, 1000))
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
    <div class="text-center">
      <p class="text-gray-500 animate-pulse">Logging out...</p>
    </div>
  </div>
</template>
