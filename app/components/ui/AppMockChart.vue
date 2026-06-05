<script setup lang="ts">
const { t } = useI18n()

const data = computed(() => [
  { label: t('days.mon'), value: 30 },
  { label: t('days.tue'), value: 45 },
  { label: t('days.wed'), value: 25 },
  { label: t('days.thu'), value: 60 },
  { label: t('days.fri'), value: 85 },
  { label: t('days.sat'), value: 55 },
  { label: t('days.sun'), value: 40 },
])

const maxValue = computed(() => Math.max(...data.value.map(d => d.value)))
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col h-full relative overflow-hidden group">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6 z-10 relative">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('dashboard.visitorStats') }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('dashboard.last7Days') }}</p>
      </div>
      <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-primary-500" />
    </div>

    <!-- Chart Area -->
    <div class="flex-1 flex items-end justify-between gap-2 mt-4 z-10 relative">
      <div 
        v-for="(item, i) in data" 
        :key="i"
        class="flex flex-col items-center flex-1 group/bar"
      >
        <!-- Tooltip / Hover Value -->
        <span class="text-xs font-bold text-primary-600 dark:text-primary-400 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 mb-2">
          {{ item.value }}
        </span>
        
        <!-- Bar -->
        <div class="w-full relative flex justify-center">
          <!-- Background Track -->
          <div 
            class="w-full max-w-[2.5rem] bg-gray-100 dark:bg-gray-800 rounded-t-md relative overflow-hidden group-hover/bar:bg-gray-200 dark:group-hover/bar:bg-gray-700 transition-colors"
            :style="{ height: '150px' }"
          >
            <!-- Foreground Active Bar -->
            <div 
              class="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 opacity-90 group-hover/bar:opacity-100 transition-all duration-500"
              :style="{ height: `${(item.value / maxValue) * 100}%` }"
            ></div>
          </div>
        </div>
        
        <!-- Label -->
        <span class="text-xs text-gray-500 dark:text-gray-400 mt-3 font-medium">{{ item.label }}</span>
      </div>
    </div>
    
    <!-- Background Decor (Glow effect) -->
    <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-400/5 dark:bg-primary-500/5 blur-3xl rounded-full z-0 pointer-events-none transition-all duration-700 group-hover:scale-150"></div>
  </div>
</template>
