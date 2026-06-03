<script setup lang="ts">
import AppButton from '~/components/ui/AppButton.vue'
import { useAppToast } from '~/composables/useAppToast'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  title: 'Users'
})
const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])

const toast = useAppToast()


// Simulasi loading data selama 1 detik agar NuxtLoadingIndicator terlihat
await new Promise(resolve => setTimeout(resolve, 1000))
</script>

<template>
  <div class="space-y-6">
    <!-- Header Halaman -->
     <div class="flex flex justify-end mb-4 gap-3">
         <AppButton icon="i-heroicons-plus" color="primary" loading-auto>{{ $t('users.create user') }}</AppButton>
      </div>

    <!-- Konten Utama (Tabel / Form / Informasi) -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <UTable
        loading
        loading-color="primary"
        loading-animation="carousel"
        :data="data"
        class="flex-1"
      />
    </div>

  </div>
</template>
