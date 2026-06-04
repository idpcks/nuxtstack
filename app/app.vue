<script setup lang="ts">
const route = useRoute()
const { isLoading } = useLoadingIndicator()

useHead({
  htmlAttrs: { lang: 'id' },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Admin Panel` : 'Admin Panel'
  },
  title: () => route.meta.title as string
})
</script>

<template>
  <div>
    <UApp :toaster="{ position: 'bottom-right' }">
      <NuxtLoadingIndicator color="#3498db" :height="5" :throttle="0" />
      
      <!-- Top Right Floating Spinner -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isLoading" class="fixed top-4 right-4 z-50 flex items-center justify-center p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs border border-gray-200 dark:border-gray-800 shadow-md">
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin text-[#3498db]" />
        </div>
      </Transition>

      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>