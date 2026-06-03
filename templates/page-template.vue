<script setup lang="ts">
import { useAppToast } from '~/composables/useAppToast'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  title: 'Nama Halaman' // Akan dibaca oleh layouts/default.vue
})

const toast = useAppToast()
</script>

<template>
  <div class="space-y-6">
    <!-- Header Halaman -->
    <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Nama Halaman</h2>
        <p class="text-sm text-gray-500">Deskripsi singkat tentang halaman ini.</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Tempat Tombol Tambah Data / Ekspor / Filter -->
      </div>
    </div>

    <!-- Konten Utama (Tabel / Form / Informasi) -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">Tulis konten halaman Anda di sini...</p>
    </div>
  </div>
</template>
