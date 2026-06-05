<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Role } from '#shared/types/role'
import { roleSchema } from '#shared/utils/validations'

const { t } = useI18n()
const toast = useAppToast()
const { openConfirmModal } = useAppModal()

definePageMeta({
  layout: 'default',
  title: 'roles.roles'
})

const pending = ref(true)
const isLoading = ref(false)

// Data awal roles (dummy)
const roles = ref<Role[]>([
  { id: '1', name: 'Admin', description: 'Administrator system with full access', status: 'Active' },
  { id: '2', name: 'Editor', description: 'Can edit content but cannot change settings', status: 'Active' },
  { id: '3', name: 'Viewer', description: 'Read-only access to the system', status: 'Inactive' }
])

const columns = computed(() => [
  { id: 'name', accessorKey: 'name', header: t('roles.name') },
  { id: 'description', accessorKey: 'description', header: t('roles.description') },
  { id: 'status', accessorKey: 'status', header: t('roles.status') },
  { id: 'actions', header: t('general.actions') }
])

// Logika Modal Form
const { isOpen, form, open, close } = useModalForm<Role>({
  id: '',
  name: '',
  description: '',
  status: 'Active'
})

onMounted(() => {
  setTimeout(() => {
    pending.value = false
  }, 1000)
})

const onCreate = () => {
  open({
    id: '',
    name: '',
    description: '',
    status: 'Active'
  })
}

const onEdit = (row: any) => {
  open(row)
}

const onSubmit = async () => {
  // Gunakan Zod Schema untuk memvalidasi (End-to-End Type Safety)
  const validation = roleSchema.safeParse(form.value)
  if (!validation.success) {
    toast.showError(t('roles.nameRequired'))
    return
  }

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))

  if (form.value.id) {
    // Mode Edit
    const index = roles.value.findIndex(r => r.id === form.value.id)
    if (index !== -1) {
      roles.value[index] = { ...roles.value[index], ...form.value }
      toast.showSuccess(t('roles.roleUpdated'))
    }
  } else {
    // Mode Tambah
    roles.value.push({
      id: String(Date.now()),
      name: form.value.name,
      description: form.value.description,
      status: form.value.status
    })
    toast.showSuccess(t('roles.roleAdded'))
  }

  close()
  isLoading.value = false
}

const onDelete = (row: any) => {
  openConfirmModal(
    t('roles.deleteConfirmTitle'),
    t('roles.deleteConfirmDesc', { name: row.name }),
    async () => {
      isLoading.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      roles.value = roles.value.filter(r => r.id !== row.id)
      toast.showSuccess(t('roles.roleDeleted'))
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
          {{ $t('roles.create role') }}
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
        :data="roles"
        class="flex-1"
      >
        <!-- Status Cell Slot -->
        <template #status-cell="{ row }">
          <UBadge
            :color="row.original.status === 'Active' ? 'success' : 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ row.original.status }}
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
      :title="form.id ? $t('roles.edit role') : $t('roles.add role')"
      @submit="onSubmit"
    >
      <div class="space-y-4 py-2">
        <UFormField :label="$t('roles.name')" required>
          <UInput v-model="form.name" :placeholder="$t('roles.enterRoleName')" class="w-full" />
        </UFormField>
        <UFormField :label="$t('roles.description')">
          <UTextarea v-model="form.description" :placeholder="$t('roles.enterDescription')" class="w-full" />
        </UFormField>
        <UFormField :label="$t('roles.status')">
          <USelect v-model="form.status" :items="['Active', 'Inactive']" class="w-full" />
        </UFormField>
      </div>
    </UiModalForm>
  </div>
</template>
