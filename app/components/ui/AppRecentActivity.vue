<script setup lang="ts">
const activities = [
  {
    user: 'James Anderson',
    action: 'mendaftar ke platform',
    time: '2 menit yang lalu',
    icon: 'i-heroicons-user-plus',
    color: 'success'
  },
  {
    user: 'Sistem',
    action: 'menyelesaikan backup harian',
    time: '1 jam yang lalu',
    icon: 'i-heroicons-server',
    color: 'info'
  },
  {
    user: 'Mia White',
    action: 'mengubah pengaturan profil',
    time: '3 jam yang lalu',
    icon: 'i-heroicons-cog-6-tooth',
    color: 'warning'
  },
  {
    user: 'William Brown',
    action: 'menghapus 5 draf laporan',
    time: '5 jam yang lalu',
    icon: 'i-heroicons-trash',
    color: 'error'
  },
  {
    user: 'Admin',
    action: 'memperbarui pengaturan keamanan',
    time: '1 hari yang lalu',
    icon: 'i-heroicons-shield-check',
    color: 'primary'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm h-full flex flex-col">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('dashboard.recentActivity') }}</h3>
      <UButton color="neutral" variant="ghost" size="xs">{{ $t('dashboard.seeAll') }}</UButton>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 space-y-6">
      <div 
        v-for="(item, i) in activities" 
        :key="i"
        class="flex gap-4 relative group"
      >
        <!-- Line Connector -->
        <div v-if="i !== activities.length - 1" class="absolute left-4 top-8 bottom-[-24px] w-px bg-gray-200 dark:bg-gray-800"></div>

        <!-- Icon / Avatar -->
        <div 
          class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white dark:ring-gray-900 shrink-0 transition-transform duration-300 group-hover:scale-110"
          :class="{
            'bg-success-50 dark:bg-success-500/10': item.color === 'success',
            'bg-info-50 dark:bg-info-500/10': item.color === 'info',
            'bg-warning-50 dark:bg-warning-500/10': item.color === 'warning',
            'bg-error-50 dark:bg-error-500/10': item.color === 'error',
            'bg-primary-50 dark:bg-primary-500/10': item.color === 'primary',
          }"
        >
          <UIcon 
            :name="item.icon" 
            class="w-4 h-4" 
            :class="{
              'text-success-500': item.color === 'success',
              'text-info-500': item.color === 'info',
              'text-warning-500': item.color === 'warning',
              'text-error-500': item.color === 'error',
              'text-primary-500': item.color === 'primary',
            }" 
          />
        </div>

        <!-- Content -->
        <div class="flex-1 pb-1">
          <p class="text-sm text-gray-800 dark:text-gray-200 leading-snug">
            <span class="font-medium text-gray-900 dark:text-white">{{ item.user }}</span> {{ item.action }}
          </p>
          <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
