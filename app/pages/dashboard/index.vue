<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { user } = useUserSession()
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ $t('dashboard.welcome') }}, <span class="text-primary-500">{{ user?.email }}</span>
      </h2>
      <p class="text-gray-500">{{ $t('dashboard.success') }}</p>
    </div>
  </div>
</template>
