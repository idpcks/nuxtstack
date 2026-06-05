<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
  title: 'auth.login.title'
})

// Skema validasi Zod (loginSchema) sudah otomatis di-import dari folder shared/utils!

type Schema = z.infer<typeof loginSchema>

const form = reactive<Schema>({
  email: '',
  password: ''
})

const { fetch: refreshSession } = useUserSession()
const toast = useAppToast()

const showPassword = ref(false)
const loading = ref(false)

const login = async () => {
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })
    await refreshSession()
    toast.showSuccess($t('auth.login.title') || 'Login Berhasil', 'Selamat datang kembali!')
    await navigateTo(AppRoutes.DASHBOARD)
  } catch (error: any) {
    console.error(error)
    toast.showError('Gagal Masuk', error.data?.message || 'Email atau password salah')
  } finally {
    loading.value = false
  }
}

const onLoginGoogle = () => {
  navigateTo(AppRoutes.AUTH_GOOGLE, { external: true })
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
    
    <!-- Tombol Ganti Bahasa (Absolute) -->
    <div class="absolute top-6 right-6 lg:right-10 z-50">
      <UiLanguageSwitcher />
    </div>

    <!-- Kiri — Branding -->
    <UiBackgroundLines className="flex flex-col items-center justify-center p-10 gap-6 border-r border-gray-200 dark:border-gray-800 !bg-transparent dark:!bg-transparent !h-full z-0">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 150 } }"
        class="relative z-10 flex flex-col items-center gap-6"
      >
        <div class="flex flex-col items-center gap-3">
          <img src="~/assets/images/brand/logo.webp" alt="Brand Logo" class="h-14 w-auto drop-shadow-sm" />
          <span class="text-lg font-medium text-gray-900 dark:text-white">DENASTECH</span>
        </div>
        <div class="mt-8 relative w-full max-w-sm flex flex-col items-center">
          <UIcon name="i-heroicons-chat-bubble-left-quote" class="text-5xl text-primary-500/20 mb-4" />
          <blockquote class="text-center relative z-10">
            <p class="text-base italic text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              "{{ $t('quotes.hadith') }}"
            </p>
            <footer class="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
              — {{ $t('quotes.hadithSource') }}
            </footer>
          </blockquote>
        </div>
      </div>
    </UiBackgroundLines>

    <!-- Kanan — Form Login -->
    <div class="flex flex-col justify-center items-center px-10 lg:px-20">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400, type: 'spring', stiffness: 200, damping: 25 } }"
        class="w-full max-w-sm flex flex-col gap-5"
      >
        <div>
          <h1 class="text-xl font-medium">{{ $t('auth.login.title') }}</h1>
          <p class="text-sm text-gray-500 mt-1">{{ $t('auth.login.subtitle') }}</p>
        </div>



        <UForm :schema="loginSchema" :state="form" @submit="login" @error="console.log('Form Error:', $event)" class="flex flex-col gap-5">
          <!-- Email -->
          <UFormField :label="$t('auth.login.email')" name="email">
            <UInput
              v-model="form.email"
              type="email"
              :placeholder="$t('auth.login.emailPlaceholder')"
              icon="i-heroicons-envelope"
              class="w-full"
            />
          </UFormField>

          <!-- Password -->
          <UFormField :label="$t('auth.login.password')" name="password">
            <UInput
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('auth.login.passwordPlaceholder')"
              icon="i-heroicons-lock-closed"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  @click="showPassword = !showPassword"
                  class="p-0"
                />
              </template>
            </UInput>
          </UFormField>

          <!-- Tombol Login -->
          <UButton type="submit" block :loading="loading" trailing-icon="i-heroicons-arrow-right">
            {{ $t('auth.login.signIn') }}
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span class="text-xs text-gray-400">{{ $t('auth.login.or') }}</span>
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        <!-- Login Google -->
        <UButton
          block
          color="neutral"
          variant="outline"
          icon="i-simple-icons-google"
          @click="onLoginGoogle"
        >
          {{ $t('auth.login.signInWithGoogle') }}
        </UButton>
      </div>
    </div>

  </div>
</template>
