<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  confirmLabel?: string   // ← jadikan prop
  cancelLabel?: string
  onConfirm: () => void
}>()

const isOpen = defineModel<boolean>('open', { default: false })

const handleConfirm = () => {
  props.onConfirm()
  isOpen.value = false
}
</script>

<template>
  <UModal v-model:open="isOpen" :title="title" :description="description">
    <template #footer>
      <div class="w-full flex justify-end gap-3">
        <UButton color="neutral" variant="ghost" @click="isOpen = false">
          {{ cancelLabel ?? 'Batal' }}
        </UButton>
        <UButton color="error" @click="handleConfirm">
          {{ confirmLabel ?? 'Ya, Konfirmasi' }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>