<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    btnsize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
    variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  }>(),
  {
    btnsize: 'md',
    color: 'primary',
    variant: 'solid'
  }
)
</script>

<template>
  <UButton
    :size="props.btnsize"
    :color="props.color"
    :variant="props.variant"
    v-bind="$attrs"
  >
    <slot />
  </UButton>
</template>