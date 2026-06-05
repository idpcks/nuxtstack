<script setup lang="ts">

const props = defineProps<{
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void | Promise<void>
}>()

const isOpen = defineModel<boolean>('open', { default: false })

const handleConfirm = async () => {
  await props.onConfirm()
  if (!props.loading) {
    isOpen.value = false
  }
}
</script>

<template>
  <UModal v-model:open="isOpen" :title="title" :description="description">
    <template #footer>
      <div class="w-full flex justify-end gap-3">
        <UiAppButton :label="cancelLabel ?? $t('general.cancel')" color="neutral" variant="ghost"
          @click="isOpen = false" />
        <UiAppButton :label="confirmLabel ?? $t('general.yesConfirm')" color="error" :loading="loading"
          @click="handleConfirm">
          <template #trailing>
            <UIcon v-if="loading" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
          </template>
        </UiAppButton>
      </div>
    </template>
  </UModal>
</template>