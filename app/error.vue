<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => {
  // Membersihkan status error dan memaksa pindah ke beranda
  clearError({ redirect: '/' })
}

// Menentukan pesan berdasarkan kode status
const is404 = computed(() => props.error?.statusCode === 404)
const title = computed(() => is404.value ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan Sistem')
const description = computed(() => is404.value 
  ? 'Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.' 
  : (props.error?.message || 'Sistem kami sedang mengalami kendala teknis. Tim kami telah diberitahu dan sedang memperbaikinya.')
)
</script>

<template>
  <!-- 
    Halaman error.vue menggantikan app.vue secara total saat crash.
    Oleh karena itu kita wajib menggunakan <UApp> agar komponen Nuxt UI seperti UButton tetap bisa dirender dengan sempurna. 
  -->
  <UApp>
    <div class="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900 relative overflow-hidden">
      <!-- Latar Belakang Garis Dinamis yang elegan -->
      <UiBackgroundLines className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 !bg-transparent">
        
        <!-- Konten Error Utama (di atas garis latar) -->
        <div class="relative z-10 flex flex-col items-center text-center max-w-lg space-y-6">
          
          <!-- Ikon Bulat -->
          <div class="w-20 h-20 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center shadow-sm border border-red-100 dark:border-red-500/20 backdrop-blur-md">
            <UIcon :name="is404 ? 'i-heroicons-map' : 'i-heroicons-exclamation-triangle'" class="w-10 h-10" />
          </div>

          <!-- Kode Status Gradient -->
          <h1 class="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-orange-400">
            {{ error?.statusCode || 500 }}
          </h1>

          <!-- Pesan Kesalahan -->
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed px-4">
              {{ description }}
            </p>
          </div>

          <!-- Tombol Pemulihan -->
          <div class="pt-6">
            <UButton 
              size="xl" 
              color="neutral" 
              variant="outline" 
              icon="i-heroicons-arrow-left"
              class="shadow-sm hover:shadow-md transition-shadow duration-300"
              @click="handleError" 
            >
              Kembali ke Beranda
            </UButton>
          </div>

        </div>
      </UiBackgroundLines>
    </div>
  </UApp>
</template>
