<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const colorMode = useColorMode()
const { t } = useI18n()

const themeItems = computed(() => [
  [
    {
      label: t('menu.switch_to_light', 'Terang'),
      icon: 'i-heroicons-sun',
      onSelect: () => colorMode.preference = 'light'
    },
    {
      label: t('menu.switch_to_dark', 'Gelap'),
      icon: 'i-heroicons-moon',
      onSelect: () => colorMode.preference = 'dark'
    },
    {
      label: t('menu.switch_to_system', 'Sistem'),
      icon: 'i-heroicons-computer-desktop',
      onSelect: () => colorMode.preference = 'system'
    }
  ]
])

const currentIcon = computed(() => {
  if (colorMode.preference === 'system') {
    return 'i-heroicons-computer-desktop'
  }
  return colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'
})
</script>

<template>
  <ClientOnly>
    <UDropdownMenu :items="themeItems" :content="{ align: 'end', collisionPadding: 12 }">
      <UButton
        color="neutral"
        variant="ghost"
        :icon="currentIcon"
        aria-label="Theme"
      />
    </UDropdownMenu>
    <template #fallback>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-heroicons-moon"
        aria-label="Theme Loading"
        disabled
      />
    </template>
  </ClientOnly>
</template>
