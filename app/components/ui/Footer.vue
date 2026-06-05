<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 px-4 sm:px-6 lg:px-8 mt-auto">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ currentYear }} <span class="font-medium text-gray-900 dark:text-white">{{ $t('footer.adminPanel') }}</span>. {{ $t('footer.allRightsReserved') }}
      </p>
      
      <div class="flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        <a href="#" class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{{ $t('footer.privacyPolicy') }}</a>
        <a href="#" class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{{ $t('footer.terms') }}</a>
        <a href="#" class="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{{ $t('footer.help') }}</a>
      </div>
    </div>
  </footer>
</template>
