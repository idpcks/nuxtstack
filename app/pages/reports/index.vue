<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'menu.reports'
})
</script>

<template>
  <div class="p-6">
    <UiPageHeader 
      :title="$t('menu.reports')" 
      description="This is a placeholder for the reports page."
    />
    <UiCard class="mt-6 p-10 flex items-center justify-center text-gray-500">
      <div class="text-center">
        <UIcon name="i-heroicons-wrench-screwdriver" class="text-5xl mx-auto mb-4 text-gray-400" />
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Under Construction</h2>
        <p class="mt-1">Halaman laporan sedang dalam tahap pengembangan.</p>
      </div>
    </UiCard>
  </div>
</template>
