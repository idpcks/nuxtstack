<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default',
  title: 'page.title' // Gunakan format key i18n (misal: 'settings.title'). Akan dibaca otomatis oleh layout.
})

// Fungsi Toast sudah otomatis ter-import oleh Nuxt (Auto-import)
const toast = useAppToast()

// State simulasi untuk proses pemuatan data (API Fetching)
const pending = ref(true)

// Simulasi request API
onMounted(() => {
  setTimeout(() => {
    pending.value = false
  }, 1000)
})
</script>

<template>
  <div 
    class="space-y-6"
    v-motion
    :initial="{ opacity: 0, y: 15 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
  >
    <!-- Header Halaman -->
    <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('page.title') }}</h2>
        <p class="text-sm text-gray-500">{{ $t('page.description') }}</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Tempat Tombol Tambah Data / Ekspor / Filter -->
        <UButton color="primary" icon="i-heroicons-plus" :disabled="pending">
          {{ $t('common.add') }}
        </UButton>
      </div>
    </div>

    <!-- Konten Utama (Tabel / Form / Informasi) -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      
      <!-- Kondisi Loading (Skeleton Loader) -->
      <div v-if="pending" class="space-y-4">
        <USkeleton class="h-10 w-full rounded-lg" />
        <USkeleton class="h-10 w-full rounded-lg" />
        <USkeleton class="h-10 w-3/4 rounded-lg" />
      </div>

      <!-- Kondisi Data Siap Ditampilkan -->
      <div v-else>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Tulis konten halaman Anda di sini...
        </p>
      </div>

    </div>
  </div>
</template>
