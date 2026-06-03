<script setup lang="ts">
const route = useRoute()

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
    <UApp>
      <NuxtLoadingIndicator color="#3498db" :height="5" :throttle="0" />
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>