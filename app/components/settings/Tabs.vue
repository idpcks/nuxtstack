<script setup lang="ts">
import { z } from 'zod'

const { t } = useI18n()
const toast = useAppToast()
const userStore = useUserStore()

const items = [
  { label: t('settings.account'), icon: 'i-lucide-user' },
  { label: t('settings.security'), icon: 'i-lucide-lock' }
]

const active = ref('0')

// accountSchema otomatis di-import dari shared/utils/validations.ts
type AccountSchema = z.infer<typeof accountSchema>

const accountForm = reactive<AccountSchema>({
  fullName: userStore.profile.fullName, // Mengambil data awal dari Pinia
  email: userStore.profile.email
})

const onSaveAccount = () => {
  // Memperbarui state global di Pinia
  userStore.updateProfile(accountForm)
  toast.showSuccess('Profil Tersimpan', 'Perubahan data akun Anda telah berhasil diterapkan.')
}

// securitySchema otomatis di-import dari shared/utils/validations.ts
type SecuritySchema = z.infer<typeof securitySchema>

const securityForm = reactive<SecuritySchema>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const onSaveSecurity = () => {
  // Simulasi sukses mengubah password
  securityForm.oldPassword = ''
  securityForm.newPassword = ''
  securityForm.confirmPassword = ''
  toast.showSuccess('Keamanan Diperbarui', 'Password Anda telah berhasil diubah.')
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
    
    <!-- Navigasi Tab (Layar HP: Horizontal) -->
    <div class="w-full md:hidden shrink-0 mb-2">
      <UTabs v-model="active" :content="false" :items="items" orientation="horizontal" class="w-full overflow-x-auto hide-scrollbar" />
    </div>

    <!-- Navigasi Tab (Desktop: Vertikal) -->
    <div class="hidden md:block w-56 shrink-0">
      <UTabs v-model="active" :content="false" :items="items" orientation="vertical" class="w-full" />
    </div>

    <!-- Area Formulir Utama -->
    <div class="flex-1">
      
      <!-- Konten Tab 0: Akun -->
      <div v-if="active === '0'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-sm animate-pulse-once">
        <div class="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('settings.account') }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ $t('settings.accountDesc') }}</p>
        </div>
        
        <UForm :schema="accountSchema" :state="accountForm" @submit="onSaveAccount" class="space-y-5 max-w-md">
          <UFormField :label="$t('settings.fullName')" name="fullName">
            <UInput v-model="accountForm.fullName" placeholder="John Doe" class="w-full" icon="i-heroicons-user" />
          </UFormField>
          
          <UFormField :label="$t('settings.emailAddress')" name="email">
            <UInput v-model="accountForm.email" type="email" placeholder="john@example.com" class="w-full" icon="i-heroicons-envelope" />
          </UFormField>
          
          <div class="pt-4">
            <UButton type="submit" color="primary">
              {{ $t('settings.saveChanges') }}
            </UButton>
          </div>
        </UForm>
      </div>

      <!-- Konten Tab 1: Keamanan -->
      <div v-else-if="active === '1'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-sm animate-pulse-once">
        <div class="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('settings.security') }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ $t('settings.securityDesc') }}</p>
        </div>
        
        <UForm :schema="securitySchema" :state="securityForm" @submit="onSaveSecurity" class="space-y-5 max-w-md">
          <UFormField :label="$t('settings.oldPassword')" name="oldPassword">
            <UInput v-model="securityForm.oldPassword" type="password" placeholder="••••••••" class="w-full" icon="i-heroicons-lock-closed" />
          </UFormField>
          
          <UFormField :label="$t('settings.newPassword')" name="newPassword">
            <UInput v-model="securityForm.newPassword" type="password" placeholder="••••••••" class="w-full" icon="i-heroicons-key" />
          </UFormField>
          
          <UFormField :label="$t('settings.confirmPassword')" name="confirmPassword">
            <UInput v-model="securityForm.confirmPassword" type="password" placeholder="••••••••" class="w-full" icon="i-heroicons-check-circle" />
          </UFormField>
          
          <div class="pt-4">
            <UButton type="submit" color="primary">
              {{ $t('settings.updatePassword') }}
            </UButton>
          </div>
        </UForm>
      </div>

    </div>
  </div>
</template>

