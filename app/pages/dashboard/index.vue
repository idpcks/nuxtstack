<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
  title: 'menu.dashboard'
})

const { t } = useI18n()

const isLoading = ref(true)

onMounted(async () => {
  // Simulasi loading awal untuk kerangka (skeleton) saat halaman dimuat
  await new Promise(resolve => setTimeout(resolve, 800))
  isLoading.value = false
})

const stats = computed(() => [
  {
    title: t('dashboard.totalUsers'),
    value: '12,480',
    icon: 'i-heroicons-users',
    color: 'primary' as const,
    trend: {
      value: '+12.2%',
      type: 'up' as const,
      label: t('dashboard.vsLastMonth')
    }
  },
  {
    title: t('dashboard.totalRevenue'),
    value: 'Rp 142.3M',
    icon: 'i-heroicons-banknotes',
    color: 'success' as const,
    trend: {
      value: '+8.4%',
      type: 'up' as const,
      label: t('dashboard.vsLastMonth')
    }
  },
  {
    title: t('dashboard.activeSessions'),
    value: '1,230',
    icon: 'i-heroicons-arrow-path',
    color: 'warning' as const,
    trend: {
      value: '-3.1%',
      type: 'down' as const,
      label: t('dashboard.vsLastHour')
    }
  },
  {
    title: t('dashboard.systemAlerts'),
    value: '0',
    icon: 'i-heroicons-exclamation-triangle',
    color: 'error' as const,
    trend: {
      value: t('dashboard.stable'),
      type: 'neutral' as const,
      label: t('dashboard.allSystemsNormal')
    }
  }
])

const timeFilters = computed(() => [
  t('dashboard.today'),
  t('dashboard.last7Days'),
  t('dashboard.thisMonth'),
  t('dashboard.thisYear')
])
</script>

<template>
  <div class="space-y-8">
    <!-- Header Dasbor -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {{ $t('dashboard.summary') }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          {{ $t('dashboard.welcomeBack') }}, Admin! {{ $t('dashboard.summaryDesc') }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <USelect 
          :items="timeFilters" 
          :model-value="timeFilters[2]"
          class="w-40"
        />
        <UButton 
          icon="i-heroicons-arrow-down-tray" 
          color="primary" 
          variant="solid"
          class="shadow-sm hover:shadow-md transition-shadow"
        >
          {{ $t('dashboard.downloadReport') }}
        </UButton>
      </div>
    </div>

    <!-- Statistics Grid (Baris 1) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <UiAppStatsCard
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

    <!-- Main Content (Baris 2) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Kolom Kiri: Chart (2/3 lebar) -->
      <div class="lg:col-span-2">
        <UiAppMockChart />
      </div>

      <!-- Kolom Kanan: Aktivitas (1/3 lebar) -->
      <div class="lg:col-span-1">
        <UiAppRecentActivity />
      </div>
    </div>
  </div>
</template>
