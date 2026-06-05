<script setup lang="ts">
import type { User } from '#shared/types/user'
import type { UserForm } from '~/types/user'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  title: 'Users'
})

const isLoading = ref(false)
const toast = useAppToast()
const { openConfirmModal } = useAppModal()

// Data awal pengguna
const users = ref<User[]>([
  {
    id: '1',
    name: 'James Anderson',
    email: 'james.anderson@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2026-06-01'
  },
  {
    id: '2',
    name: 'Mia White',
    email: 'mia.white@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2026-06-02'
  },
  {
    id: '3',
    name: 'William Brown',
    email: 'william.brown@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2026-06-03'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2026-06-04'
  }
])

const columns = [
  { id: 'name', accessorKey: 'name', header: 'Nama' },
  { id: 'email', accessorKey: 'email', header: 'Email' },
  { id: 'role', accessorKey: 'role', header: 'Peran' },
  { id: 'status', accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: 'Aksi' }
]

// Logika Modal Form
const { isOpen, form, open, close } = useModalForm<UserForm>({
  id: '',
  name: '',
  email: '',
  role: 'Viewer',
  status: 'Active'
})

const onCreate = () => {
  open({
    id: '',
    name: '',
    email: '',
    role: 'Viewer',
    status: 'Active'
  })
}

const onEdit = (row: any) => {
  open(row)
}

const onSubmit = async () => {
  if (!form.value.name.trim() || !form.value.email.trim()) {
    toast.showError('Nama dan Email wajib diisi!')
    return
  }

  isLoading.value = true

  // Simulasi request delay 500ms
  await new Promise(resolve => setTimeout(resolve, 500))

  if (form.value.id) {
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
        toast.showSuccess('Pengguna berhasil diperbarui!')
      }
    }
  } else {
    // Mode Tambah
    const newUser = {
      id: String(Date.now()),
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
      status: form.value.status,
      createdAt: new Date().toISOString().slice(0, 10)
    }
    users.value.push(newUser)
    toast.showSuccess('Pengguna baru berhasil ditambahkan!')
  }

  close()
  isLoading.value = false
}

const onDelete = (row: any) => {
  openConfirmModal(
    'Hapus Pengguna',
    `Apakah Anda yakin ingin menghapus pengguna "${row.name}"? Tindakan ini tidak dapat dibatalkan.`,
    async () => {
      isLoading.value = true
      
      // Simulasi request delay 500ms
      await new Promise(resolve => setTimeout(resolve, 500))
      
      users.value = users.value.filter(u => u.id !== row.id)
      toast.showSuccess('Pengguna berhasil dihapus!')
      isLoading.value = false
    },
    'Hapus',
    'Batal'
  )
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Halaman -->
    <div class="flex justify-end mb-4 gap-3">
      <UiAppButton icon="i-heroicons-plus" color="primary" @click="onCreate">
        {{ $t('users.create user') || 'Tambah Pengguna' }}
      </UiAppButton>
    </div>

    <!-- Konten Utama (Tabel / Form / Informasi) -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
      <UTable
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
    <UiAppModalForm
      v-model:isOpen="isOpen"
      :title="form.id ? 'Edit Pengguna' : 'Tambah Pengguna'"
      @submit="onSubmit"
    >
      <div class="space-y-4 py-2">
        <UFormField label="Nama" required>
          <UInput v-model="form.name" placeholder="Masukkan nama lengkap" class="w-full" />
        </UFormField>
        <UFormField label="Email" required>
          <UInput v-model="form.email" type="email" placeholder="contoh@domain.com" class="w-full" />
        </UFormField>
        <UFormField label="Peran">
          <USelect v-model="form.role" :items="['Admin', 'Editor', 'Viewer']" class="w-full" />
        </UFormField>
        <UFormField label="Status">
          <USelect v-model="form.status" :items="['Active', 'Inactive']" class="w-full" />
        </UFormField>
      </div>
    </UiAppModalForm>
  </div>
</template>
