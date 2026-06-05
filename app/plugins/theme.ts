export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const primaryCookie = useCookie('theme_primary')
  const neutralCookie = useCookie('theme_neutral')

  // Jika pengguna sudah pernah memilih warna sebelumnya, gunakan itu
  if (primaryCookie.value) {
    appConfig.ui.colors.primary = primaryCookie.value as string
  }
  if (neutralCookie.value) {
    appConfig.ui.colors.neutral = neutralCookie.value as string
  }
})
