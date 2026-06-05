<script setup lang="ts">
const { user } = useUserSession()

const open = useCookie('sidebar_state', { default: () => true })
const isMobileOpen = ref(false)

const { navigation, userItems } = useNavigation()
</script>

<template>
  <div class="flex flex-1 h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
    <!-- Desktop Sidebar -->
    <USidebar
      v-model:open="open"
      class="hidden lg:flex"
      :ui="{
        container: 'h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900',
        inner: 'divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        <div class="flex items-center py-3 overflow-hidden" :class="[open ? 'gap-3 px-2 justify-start' : 'justify-center px-0']">
          <div class="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0 transition-transform">
            A
          </div>
          <span v-if="open" class="font-semibold text-gray-900 dark:text-white truncate">
            Admin Panel
          </span>
        </div>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
          :items="navigation"
          orientation="vertical"
          :ui="{ link: 'p-2 overflow-hidden mb-1' }"
        />
      </template>

      <template #footer>
        <UDropdownMenu
          :items="userItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
            color="neutral"
            variant="ghost"
            square
            class="w-full data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 overflow-hidden"
            :class="[open ? 'justify-start' : 'justify-center']"
          >
            <div class="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 shrink-0 transition-transform">
              {{ user?.email?.charAt(0)?.toUpperCase() ?? 'U' }}
            </div>
            <div v-if="open" class="flex flex-col text-left truncate ms-2">
              <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ user?.email?.split('@')[0] || 'User' }}</span>
              <span class="text-xs text-gray-500 truncate">{{ user?.email || 'admin@email.com' }}</span>
            </div>
            <UIcon v-if="open" name="i-lucide-chevrons-up-down" class="ms-auto shrink-0 w-4 h-4 text-gray-400" />
          </UButton>
        </UDropdownMenu>
      </template>
    </USidebar>

    <!-- Mobile Slideover -->
    <USlideover v-model:open="isMobileOpen" side="left">
      <template #content>
        <div class="flex flex-col h-full bg-white dark:bg-gray-900">
          <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">A</div>
            <span class="font-semibold text-gray-900 dark:text-white truncate">Admin Panel</span>
            <UButton icon="i-heroicons-x-mark" color="neutral" variant="ghost" class="ms-auto" @click="isMobileOpen = false" />
          </div>
          <div class="flex-1 overflow-y-auto px-2 py-4">
            <UNavigationMenu :items="navigation" orientation="vertical" />
          </div>
          <div class="p-2 border-t border-gray-200 dark:border-gray-800 shrink-0">
            <UDropdownMenu
              :items="userItems"
              :content="{ align: 'center', collisionPadding: 12 }"
              :ui="{ content: 'w-full' }"
            >
              <UButton
                color="neutral"
                variant="ghost"
                square
                class="w-full data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 overflow-hidden justify-start"
              >
                <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 shrink-0">
                  {{ user?.email?.charAt(0)?.toUpperCase() ?? 'U' }}
                </div>
                <div class="flex flex-col text-left truncate ms-2">
                  <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ user?.email?.split('@')[0] || 'User' }}</span>
                  <span class="text-xs text-gray-500 truncate">{{ user?.email || 'admin@email.com' }}</span>
                </div>
                <UIcon name="i-lucide-chevrons-up-down" class="ms-auto shrink-0 w-4 h-4 text-gray-400" />
              </UButton>
            </UDropdownMenu>
          </div>
        </div>
      </template>
    </USlideover>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm z-10">
        <div class="flex items-center gap-4">
          <!-- Desktop Toggle -->
          <UButton
            icon="i-lucide-panel-left"
            color="neutral"
            variant="ghost"
            aria-label="Toggle sidebar"
            class="hidden lg:flex"
            @click="open = !open"
          />
          <!-- Mobile Toggle -->
          <UButton
            icon="i-heroicons-bars-3"
            color="neutral"
            variant="ghost"
            aria-label="Open menu"
            class="lg:hidden"
            @click="isMobileOpen = true"
          />
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
            {{ $route.meta.title ? $t($route.meta.title as string) : 'Dashboard' }}
          </h1>
        </div>
        <div class="flex items-center gap-2 sm:gap-4">
          <UiLanguageSwitcher />
          <UiThemeSwitcher />
          <UButton icon="i-heroicons-bell" color="neutral" variant="ghost" />
        </div>
      </header>

      <main class="flex-1 overflow-y-auto py-4 sm:py-6 lg:py-8">
        <UContainer>
          <slot />
        </UContainer>
      </main>
      
      <!-- Footer Global -->
      <UiFooter />
    </div>
  </div>
</template>