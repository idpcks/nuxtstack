<script setup lang="ts">
import AppButton from './AppButton.vue'

defineProps<{
  title: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'submit'): void
}>()
</script>

<template>
  <UModal
    :open="isOpen"
    @update:open="emit('update:isOpen', $event)"
  >
    <template #content>
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            {{ title }}
          </h3>
        </template>

        <slot />

        <template #footer>
          <div class="flex justify-end gap-2">
            
            <!-- Cancel -->
            <UiAppButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="outline"
              @click="emit('update:isOpen', false)"
            >
              {{ $t('general.cancel') }}
            </UiAppButton>

            <!-- Submit -->
            <UiAppButton
              icon="i-heroicons-check"
              color="primary"
              loading-auto
              @click="emit('submit')"
            >
              {{ $t('general.save') }}
            </UiAppButton>

          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>