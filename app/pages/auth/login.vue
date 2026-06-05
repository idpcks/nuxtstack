<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

// Define Zod validation schema
const schema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi')
})

type Schema = z.infer<typeof schema>

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
    await navigateTo('/dashboard')
  } catch (error: any) {
    console.error(error)
    toast.showError('Gagal Masuk', error.data?.message || 'Email atau password salah')
  } finally {
    loading.value = false
  }
}

const onLoginGoogle = () => {
  navigateTo('/auth/google', { external: true })
}
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
    
    <!-- Tombol Ganti Bahasa (Absolute) -->
    <div class="absolute top-6 right-6 lg:right-10 z-50">
      <UiAppLanguageSwitcher />
    </div>

    <!-- Kiri — Branding -->
    <UiBackgroundLines className="flex flex-col items-center justify-center p-10 gap-6 border-r border-gray-200 dark:border-gray-800 !bg-gray-50 dark:!bg-gray-900 !h-full z-0">
      <div class="relative z-10 flex flex-col items-center gap-6">
        <div class="flex flex-col items-center gap-3">
          <div class="w-14 h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center shadow-xs">
            <UIcon name="i-heroicons-squares-2x2" class="text-2xl" />
          </div>
          <span class="text-lg font-medium text-gray-900 dark:text-white">Admin Panel</span>
          <p class="text-sm text-gray-500 text-center leading-relaxed">
            Kelola semua data dan aktivitas<br>bisnis kamu dalam satu tempat.
          </p>
        </div>
        <div class="flex flex-col gap-3 w-full max-w-xs">
          <div class="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs border border-gray-200 dark:border-gray-700 rounded-lg">
            <UIcon name="i-heroicons-chart-bar" class="text-gray-400" />
            <span class="text-sm text-gray-500">Analitik & laporan real-time</span>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs border border-gray-200 dark:border-gray-700 rounded-lg">
            <UIcon name="i-heroicons-users" class="text-gray-400" />
            <span class="text-sm text-gray-500">Manajemen pengguna & roles</span>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs border border-gray-200 dark:border-gray-700 rounded-lg">
            <UIcon name="i-heroicons-lock-closed" class="text-gray-400" />
            <span class="text-sm text-gray-500">Keamanan data terjamin</span>
          </div>
        </div>
      </div>
    </UiBackgroundLines>

    <!-- Kanan — Form Login -->
    <div class="flex flex-col justify-center items-center px-10 lg:px-20">
      <div class="w-full max-w-sm flex flex-col gap-5">
        <div>
          <h1 class="text-xl font-medium">{{ $t('auth.login.title') }}</h1>
          <p class="text-sm text-gray-500 mt-1">{{ $t('auth.login.subtitle') }}</p>
        </div>



        <UForm :schema="schema" :state="form" @submit="login" @error="console.log('Form Error:', $event)" class="flex flex-col gap-5">
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
          <UButton type="submit" block :loading="loading">
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