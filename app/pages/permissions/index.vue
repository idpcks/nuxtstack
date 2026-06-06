<script setup lang="ts">
import type { Permission } from '#shared/types/permission'
import { permissionSchema } from '#shared/utils/validations'

const { t } = useI18n()
const toast = useAppToast()
const { openConfirmModal } = useAppModal()

definePageMeta({
  layout: 'default',
  title: 'permissions.permissions'
})

const pending = ref(true)
const isLoading = ref(false)

// Data awal permissions (dummy)
const permissions = ref<Permission[]>([
  { id: 1, name: 'Create User', description: 'Can create new user', group: 'User Management' },
  { id: 2, name: 'Edit User', description: 'Can edit user', group: 'User Management' },
  { id: 3, name: 'Delete User', description: 'Can delete user', group: 'User Management' },
  { id: 4, name: 'View Dashboard', description: 'Can view dashboard', group: 'Dashboard' }
])

const columns = computed(() => [
  { id: 'name', accessorKey: 'name', header: t('permissions.name') },
  { id: 'group', accessorKey: 'group', header: t('permissions.group') },
  { id: 'description', accessorKey: 'description', header: t('permissions.description') },
  { id: 'actions', header: t('general.actions') }
])

// Logika Modal Form
const { isOpen, form, open, close } = useModalForm<Permission>({
  id: 0,
  name: '',
  group: '',
  description: ''
})

onMounted(() => {
  setTimeout(() => {
    pending.value = false
  }, 1000)
})

const onCreate = () => {
  open({
    id: 0,
    name: '',
    group: '',
    description: ''
  })
}

const onEdit = (row: any) => {
  open(row)
}

const onSubmit = async () => {
  // Gunakan Zod Schema untuk memvalidasi (End-to-End Type Safety)
  const validation = permissionSchema.safeParse(form.value)
  if (!validation.success) {
    toast.showError(t('permissions.nameRequired'))
    return
  }

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))

  if (form.value.id) {
    // Mode Edit
    const index = permissions.value.findIndex(p => p.id === form.value.id)
    if (index !== -1) {
      permissions.value[index] = { ...permissions.value[index], ...form.value }
      toast.showSuccess(t('permissions.permissionUpdated'))
    }
  } else {
    // Mode Tambah
    permissions.value.push({
      id: Date.now(),
      name: form.value.name,
      group: form.value.group,
      description: form.value.description
    })
    toast.showSuccess(t('permissions.permissionAdded'))
  }

  close()
  isLoading.value = false
}

const onDelete = (row: any) => {
  openConfirmModal(
    t('permissions.deleteConfirmTitle'),
    t('permissions.deleteConfirmDesc', { name: row.name }),
    async () => {
      isLoading.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      permissions.value = permissions.value.filter(p => p.id !== row.id)
      toast.showSuccess(t('permissions.permissionDeleted'))
      isLoading.value = false
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
    <div class="flex items-center justify-end pb-4 border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center gap-3">
        <!-- Tempat Tombol Tambah Data / Ekspor / Filter -->
        <UButton color="primary" icon="i-heroicons-plus" :disabled="pending" @click="onCreate">
          {{ $t('permissions.create permission') }}
        </UButton>
      </div>
    </div>

    <!-- Konten Utama (Tabel / Form / Informasi) -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      
      <!-- Kondisi Loading (Skeleton Loader) -->
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

      <!-- Kondisi Data Siap Ditampilkan -->
      <UTable
        v-else
        :loading="isLoading"
        loading-color="primary"
        loading-animation="carousel"
        :columns="columns"
        :data="permissions"
        class="flex-1"
      >
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
      :title="form.id ? $t('permissions.edit permission') : $t('permissions.add permission')"
      @submit="onSubmit"
    >
      <div class="space-y-4 py-2">
        <UFormField :label="$t('permissions.name')" required>
          <UInput v-model="form.name" :placeholder="$t('permissions.enterPermissionName')" class="w-full" />
        </UFormField>
        <UFormField :label="$t('permissions.group')" required>
          <UInput v-model="form.group" :placeholder="$t('permissions.enterPermissionGroup')" class="w-full" />
        </UFormField>
        <UFormField :label="$t('permissions.description')">
          <UTextarea v-model="form.description" :placeholder="$t('permissions.enterDescription')" class="w-full" />
        </UFormField>
      </div>
    </UiModalForm>
  </div>
</template>