<script setup lang="ts">
interface Trend {
  value: string | number
  type: 'up' | 'down' | 'neutral'
  label?: string
}

withDefaults(
  defineProps<{
    title: string
    value: string | number
    icon?: string
    description?: string
    trend?: Trend
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
    loading?: boolean
  }>(),
  {
    color: 'primary',
    loading: false
  }
)
</script>

<template>
  <div 
    class="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
  >
    <!-- Top accent border line -->
    <div 
      class="absolute top-0 left-0 h-1 w-full bg-gradient-to-r transition-all duration-300"
      :class="{
        'from-primary-500 to-primary-600': color === 'primary',
        'from-success-500 to-success-600': color === 'success',
        'from-warning-500 to-warning-600': color === 'warning',
        'from-error-500 to-error-600': color === 'error',
        'from-info-500 to-info-600': color === 'info',
        'from-gray-400 to-gray-500': color === 'neutral',
      }"
    />

    <!-- Loading Skeleton State -->
    <div v-if="loading" class="space-y-3">
      <div class="flex justify-between items-start">
        <div class="space-y-2 flex-1">
          <USkeleton class="h-4 w-2/3" />
          <USkeleton class="h-8 w-1/2" />
        </div>
        <USkeleton class="h-12 w-12 rounded-xl" />
      </div>
      <div class="flex items-center gap-2 pt-2">
        <USkeleton class="h-4 w-12 rounded-full" />
        <USkeleton class="h-3 w-24" />
      </div>
    </div>

    <!-- Active State -->
    <div v-else class="flex justify-between items-start">
      <div class="space-y-2 flex-1 min-w-0">
        <!-- Card Title -->
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
          {{ title }}
        </p>
        
        <!-- Card Value -->
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {{ value }}
        </h3>

        <!-- Trend and Subtext -->
        <div class="flex items-center flex-wrap gap-2 text-xs pt-1">
          <div 
            v-if="trend" 
            class="flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full"
            :class="{
              'bg-success-50 dark:bg-success-950/30 text-success-600 dark:text-success-400': trend.type === 'up',
              'bg-error-50 dark:bg-error-950/30 text-error-600 dark:text-error-400': trend.type === 'down',
              'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400': trend.type === 'neutral',
            }"
          >
            <UIcon 
              :name="trend.type === 'up' ? 'i-heroicons-arrow-trending-up' : trend.type === 'down' ? 'i-heroicons-arrow-trending-down' : 'i-heroicons-minus'" 
              class="w-3.5 h-3.5"
            />
            <span>{{ trend.value }}</span>
          </div>
          
          <span v-if="description || trend?.label" class="text-gray-500 dark:text-gray-400">
            {{ description || trend?.label }}
          </span>
        </div>
      </div>

      <!-- Icon representation -->
      <div 
        v-if="icon" 
        class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0 ms-4"
        :class="{
          'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400': color === 'primary',
          'bg-success-50 dark:bg-success-950/30 text-success-600 dark:text-success-400': color === 'success',
          'bg-warning-50 dark:bg-warning-950/30 text-warning-600 dark:text-warning-400': color === 'warning',
          'bg-error-50 dark:bg-error-950/30 text-error-600 dark:text-error-400': color === 'error',
          'bg-info-50 dark:bg-info-950/30 text-info-600 dark:text-info-400': color === 'info',
          'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400': color === 'neutral',
        }"
      >
        <UIcon :name="icon" class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>
