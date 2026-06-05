<script setup lang="ts">
const appConfig = useAppConfig()
const primaryCookie = useCookie('theme_primary', { maxAge: 60 * 60 * 24 * 365 })
const neutralCookie = useCookie('theme_neutral', { maxAge: 60 * 60 * 24 * 365 })

// Tailwind tidak bisa mengkompilasi class dinamis seperti `bg-${color}-500` jika tidak dipakai secara eksplisit.
// Jadi kita menggunakan pemetaan statis agar Tailwind menyadarinya saat proses build.
const primaryColors = [
  { name: 'emerald', class: 'bg-emerald-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'indigo', class: 'bg-indigo-500' },
  { name: 'violet', class: 'bg-violet-500' },
  { name: 'rose', class: 'bg-rose-500' },
  { name: 'orange', class: 'bg-orange-500' }
]

const neutralColors = [
  { name: 'slate', class: 'bg-slate-500' },
  { name: 'gray', class: 'bg-gray-500' },
  { name: 'zinc', class: 'bg-zinc-500' },
  { name: 'neutral', class: 'bg-neutral-500' },
  { name: 'stone', class: 'bg-stone-500' }
]

const setPrimary = (color: string) => {
  appConfig.ui.colors.primary = color
  primaryCookie.value = color
}

const setNeutral = (color: string) => {
  appConfig.ui.colors.neutral = color
  neutralCookie.value = color
}
</script>

<template>
  <UPopover :content="{ align: 'end', collisionPadding: 12 }">
    <UButton icon="i-heroicons-swatch" color="neutral" variant="ghost" :aria-label="$t('menu.themeColors')" />
    
    <template #content>
      <div class="p-4 w-64">
        <!-- Warna Utama -->
        <div>
          <p class="text-sm font-medium mb-3 text-gray-900 dark:text-white">{{ $t('menu.primaryColor') }}</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in primaryColors"
              :key="color.name"
              class="w-6 h-6 rounded-full cursor-pointer focus:outline-none ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 transition-all hover:scale-110"
              :class="[
                appConfig.ui.colors.primary === color.name ? 'ring-primary-500 scale-110' : 'ring-transparent',
                color.class
              ]"
              :title="color.name"
              @click="setPrimary(color.name)"
            />
          </div>
        </div>
        
        <!-- Warna Dasar -->
        <div class="mt-6">
          <p class="text-sm font-medium mb-3 text-gray-900 dark:text-white">{{ $t('menu.neutralColor') }}</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in neutralColors"
              :key="color.name"
              class="w-6 h-6 rounded-full cursor-pointer focus:outline-none ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 transition-all hover:scale-110"
              :class="[
                appConfig.ui.colors.neutral === color.name ? 'ring-gray-500 scale-110' : 'ring-transparent',
                color.class
              ]"
              :title="color.name"
              @click="setNeutral(color.name)"
            />
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
