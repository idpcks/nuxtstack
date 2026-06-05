<script setup lang="ts">
const { loggedIn } = useUserSession()

if (loggedIn.value) {
  await navigateTo(AppRoutes.DASHBOARD)
} else {
  await navigateTo(AppRoutes.LOGIN)
}
</script>

<template>
  <div />
</template>