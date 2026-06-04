<script setup lang="ts">
import AppStatsCard from '~/components/ui/AppStatsCard.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const isLoading = ref(false)


const stats = computed(() => [
  {
    title: 'Total Pengguna',
    value: '12,480',
    icon: 'i-heroicons-users',
    color: 'primary' as const,
    trend: {
      value: '+12.2%',
      type: 'up' as const,
      label: 'vs bulan lalu'
    }
  },
  {
    title: 'Total Pendapatan',
    value: 'Rp 142.3M',
    icon: 'i-heroicons-banknotes',
    color: 'success' as const,
    trend: {
      value: '+8.4%',
      type: 'up' as const,
      label: 'vs bulan lalu'
    }
  },
  {
    title: 'Sesi Aktif',
    value: '1,230',
    icon: 'i-heroicons-arrow-path',
    color: 'warning' as const,
    trend: {
      value: '-3.1%',
      type: 'down' as const,
      label: 'vs jam lalu'
    }
  },
  {
    title: 'Peringatan Sistem',
    value: '0',
    icon: 'i-heroicons-exclamation-triangle',
    color: 'error' as const,
    trend: {
      value: 'Stabil',
      type: 'neutral' as const,
      label: 'Semua sistem normal'
    }
  }
])
</script>

<template>
  <div class="space-y-6">
    <!-- Statistics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AppStatsCard
        v-for="(item, index) in stats"
        :key="index"
        :title="item.title"
        :value="item.value"
        :icon="item.icon"
        :color="item.color"
        :trend="item.trend"
        :loading="isLoading"
      />
    </div>
  </div>
</template>


