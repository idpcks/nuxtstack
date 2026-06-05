import type { DropdownMenuItem } from '@nuxt/ui'

export const useNavigation = () => {
  const { t } = useI18n()
  const { openConfirmModal } = useAppModal()
  const { clear } = useUserSession()

  const logout = async () => {
    await clear()
    await navigateTo(AppRoutes.LOGIN)
  }

  const confirmLogout = () => {
    openConfirmModal(
      t('auth.logout.title', 'Konfirmasi Logout'),
      t('auth.logout.desc', 'Apakah kamu yakin ingin keluar dari aplikasi?'),
      logout,
      t('auth.logout.confirm', 'Ya, Keluar')
    )
  }

  const navigation = computed(() => [
    { label: t('menu.dashboard', 'Dashboard'), icon: 'i-heroicons-squares-2x2', to: AppRoutes.DASHBOARD },
    { label: t('menu.users', 'Users'), icon: 'i-heroicons-users', to: AppRoutes.USERS },
    { label: t('menu.reports', 'Reports'), icon: 'i-heroicons-chart-bar', to: '/reports' }
  ])

  const userItems = computed<DropdownMenuItem[][]>(() => [
    [
      { label: t('menu.settings', 'Pengaturan'), icon: 'i-lucide-settings', to: AppRoutes.SETTINGS }
    ],
    [
      {
        label: t('menu.logout', 'Keluar'),
        icon: 'i-lucide-log-out',
        onSelect: () => confirmLogout()
      }
    ]
  ])

  return {
    navigation,
    userItems
  }
}
