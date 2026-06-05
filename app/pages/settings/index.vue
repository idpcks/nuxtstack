<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'menu.settings'
})

const { t } = useI18n()

const isLoading = ref(true)

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  isLoading.value = false
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <!-- Skeleton Navigasi Tab (Mobile: Horizontal) -->
        <div class="w-full md:hidden shrink-0 flex gap-2 mb-2">
            <USkeleton class="h-9 w-24 rounded-lg" />
            <USkeleton class="h-9 w-28 rounded-lg" />
        </div>

        <!-- Skeleton Navigasi Tab (Desktop: Vertikal) -->
        <div class="hidden md:flex flex-col w-56 shrink-0 gap-2">
            <USkeleton class="h-10 w-full rounded-lg" />
            <USkeleton class="h-10 w-full rounded-lg opacity-50" />
        </div>

        <!-- Skeleton Area Formulir Utama -->
        <div class="flex-1">
            <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-sm">
                <!-- Skeleton Header Formulir -->
                <div class="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <USkeleton class="h-6 w-40 mb-3" />
                    <USkeleton class="h-4 w-64" />
                </div>
                
                <!-- Skeleton Baris-Baris Input -->
                <div class="space-y-6 max-w-md">
                    <!-- Field 1 -->
                    <div class="space-y-2">
                        <USkeleton class="h-4 w-28" />
                        <USkeleton class="h-10 w-full rounded-lg" />
                    </div>
                    <!-- Field 2 -->
                    <div class="space-y-2">
                        <USkeleton class="h-4 w-32" />
                        <USkeleton class="h-10 w-full rounded-lg" />
                    </div>
                    <!-- Tombol Aksi -->
                    <div class="pt-4">
                        <USkeleton class="h-10 w-36 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="space-y-8">
        <SettingsTabs />
    </div>
  </div>
</template>
