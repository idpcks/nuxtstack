<script setup lang="ts">
import AppButton from './AppButton.vue';

const props = defineProps<{
  title: string
  description?: string
  confirmLabel?: string
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
        <AppButton :label="cancelLabel ?? $t('general.cancel')" color="neutral" variant="ghost"
          @click="isOpen = false">
        </AppButton>
        <AppButton :label="confirmLabel ?? $t('general.yesConfirm')" color="error" @click="handleConfirm">
        </AppButton>
      </div>
    </template>
  </UModal>
</template>