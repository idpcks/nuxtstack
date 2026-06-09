<script setup lang="ts">
import type { User } from '#shared/types/user'
import type { UserForm } from '~/types/user'

definePageMeta({
  layout: 'default',
  title: 'menu.users'
})

const isLoading = ref(false)
const toast = useAppToast()
const { openConfirmModal } = useAppModal()
const { t } = useI18n()

// State untuk simulasi loading awal halaman (Skeleton)
const pending = ref(true)

onMounted(() => {
  setTimeout(() => {
    pending.value = false
  }, 1000)
})

// Data awal pengguna
const users = ref<User[]>([
  {
    id: 1,
    name: 'James Anderson',
    email: 'james.anderson@example.com',
    role: 'Admin',
    status: true,
    createdAt: '2026-06-01'
  },
  {
    id: 2,
    name: 'Mia White',
    email: 'mia.white@example.com',
    role: 'Editor',
    status: true,
    createdAt: '2026-06-02'
  },
  {
    id: 3,
    name: 'William Brown',
    email: 'william.brown@example.com',
    role: 'Viewer',
    status: false,
    createdAt: '2026-06-03'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'Admin',
    status: true,
    createdAt: '2026-06-04'
  }
])

const columns = computed(() => [
  { id: 'name', accessorKey: 'name', header: t('users.name') },
  { id: 'email', accessorKey: 'email', header: t('users.email') },
  { id: 'role', accessorKey: 'role', header: t('users.role') },
  { id: 'status', accessorKey: 'status', header: t('users.status') },
  { id: 'actions', header: t('general.actions') }
])

// Logika Modal Form
const { isOpen, form, open, close } = useModalForm<UserForm>({
  id: undefined,
  name: '',
  email: '',
  role: 'Viewer',
  status: true
})

const onCreate = () => {
  open({
    id: undefined,
    name: '',
    email: '',
    role: 'Viewer',
    status: true
  })
}

const onEdit = (row: any) => {
  open(row)
}

const onSubmit = async () => {
  if (!form.value.name.trim() || !form.value.email.trim()) {
    toast.showError(t('users.nameEmailRequired'))
    return
  }

  isLoading.value = true

  try {
    // TODO: Ganti dengan pemanggilan API yang riil nanti
    // const method = form.value.id ? 'PUT' : 'POST'
    // const endpoint = form.value.id ? `/users/${form.value.id}` : '/users'
    // await useApiClient(endpoint, { method, body: form.value })

    await new Promise(resolve => setTimeout(resolve, 500))

    if (form.value.id !== undefined && form.value.id > 0) {
      // Mode Edit
      const index = users.value.findIndex(u => u.id === form.value.id)
      if (index !== -1) {
        const existingUser = users.value[index]
        if (existingUser) {
          users.value[index] = {
            ...existingUser,
            name: form.value.name,
            email: form.value.email,
            role: form.value.role,
            status: form.value.status
          }
          toast.showSuccess(t('users.userUpdated'))
        }
      }
    } else {
      // Mode Tambah
      const newUser = {
        id: Date.now(),
        name: form.value.name,
        email: form.value.email,
        role: form.value.role,
        status: form.value.status,
        createdAt: new Date().toISOString().slice(0, 10)
      }
      users.value.push(newUser)
      toast.showSuccess(t('users.userAdded'))
    }
  } catch (error: any) {
    toast.showError(error.message || 'Terjadi kesalahan')
  } finally {
    isLoading.value = false
    close()
  }
}

const onDelete = (row: any) => {
  openConfirmModal(
    t('users.deleteConfirmTitle'),
    t('users.deleteConfirmDesc', { name: row.name }),
    async () => {
      isLoading.value = true
      
      try {
        // TODO: Ganti dengan pemanggilan API riil
        // await useApiClient(`/users/${row.id}`, { method: 'DELETE' })
        
        await new Promise(resolve => setTimeout(resolve, 500))
        users.value = users.value.filter(u => u.id !== row.id)
        toast.showSuccess(t('users.userDeleted'))
      } catch (error: any) {
        toast.showError(error.message || 'Gagal menghapus data')
      } finally {
        isLoading.value = false
      }
    },
    t('general.delete'),
    t('general.cancel')
  )
}
</script>

<template>
  <div 
    class="space-y-6"
    v-motion
    :initial="{ opacity: 0, y: 15 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
  >
    <!-- Header Halaman -->
    <div class="flex justify-end mb-4 gap-3">
      <UiButton icon="i-heroicons-plus" color="primary" @click="onCreate" :disabled="pending">
        {{ $t('users.create user') || 'Tambah Pengguna' }}
      </UiButton>
    </div>

    <!-- Konten Utama (Tabel / Form / Informasi) -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
      
      <!-- Kondisi Loading Awal (Skeleton) -->
      <div v-if="pending" class="space-y-4">
        <div class="flex gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <USkeleton class="h-6 w-1/4 rounded" />
          <USkeleton class="h-6 w-1/4 rounded" />
          <USkeleton class="h-6 w-1/4 rounded" />
          <USkeleton class="h-6 w-1/4 rounded" />
        </div>
        <USkeleton class="h-10 w-full rounded-lg" />
        <USkeleton class="h-10 w-full rounded-lg" />
        <USkeleton class="h-10 w-3/4 rounded-lg" />
      </div>

      <UTable
        v-else
        :loading="isLoading"
        loading-color="primary"
        loading-animation="carousel"
        :columns="columns"
        :data="users"
        class="flex-1"
      >
        <!-- Status Cell Slot -->
        <template #status-cell="{ row }">
          <UBadge
            :color="row.original.status ? 'success' : 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ row.original.status ? 'Active' : 'Inactive' }}
          </UBadge>
        </template>

        <!-- Actions Cell Slot -->
        <template #actions-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              icon="i-heroicons-pencil-square"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="onEdit(row.original)"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              size="sm"
              @click="onDelete(row.original)"
            />
          </div>
        </template>
      </UTable>
    </div>

    <!-- Form Add / Edit Modal -->
    <UiModalForm
      v-model:isOpen="isOpen"
      :title="form.id ? $t('users.edit user') : $t('users.add user')"
      @submit="onSubmit"
    >
      <div class="space-y-4 py-2">
        <UFormField :label="$t('users.name')" required>
          <UInput v-model="form.name" :placeholder="$t('users.enterFullName')" class="w-full" />
        </UFormField>
        <UFormField :label="$t('users.email')" required>
          <UInput v-model="form.email" type="email" :placeholder="$t('auth.login.emailPlaceholder') || 'contoh@domain.com'" class="w-full" />
        </UFormField>
        <UFormField :label="$t('users.role')">
          <USelect v-model="form.role" :items="['Admin', 'Editor', 'Viewer']" class="w-full" />
        </UFormField>
        <UFormField :label="$t('users.status')">
          <UCheckbox v-model="form.status" :label="form.status ? 'Active' : 'Inactive'" />
        </UFormField>
      </div>
    </UiModalForm>
  </div>
</template>
