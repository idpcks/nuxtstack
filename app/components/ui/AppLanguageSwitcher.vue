<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, locales, setLocale } = useI18n()

// Memetakan bahasa yang tersedia ke dalam format dropdown Nuxt UI v3
const languageItems = computed(() => {
  const items = (locales.value as Array<{ code: 'id' | 'en' }>).map(l => ({
    label: l.code === 'id' ? 'Bahasa Indonesia' : 'English',
    icon: 'i-heroicons-globe-alt',
    onSelect: () => setLocale(l.code)
  }))
  return [items]
})

const currentLangLabel = computed(() => {
  return locale.value === 'id' ? 'ID' : 'EN'
})
</script>

<template>
  <UDropdownMenu :items="languageItems" :content="{ align: 'end', collisionPadding: 12 }">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-heroicons-language"
      :label="currentLangLabel"
      class="font-medium"
    />
  </UDropdownMenu>
</template>
