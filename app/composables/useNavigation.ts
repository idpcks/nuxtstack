import type { DropdownMenuItem } from '@nuxt/ui'

export const useNavigation = () => {
  const { t } = useI18n()
  const colorMode = useColorMode()
  const { openConfirmModal } = useAppModal()
  const { clear } = useUserSession()

  const logout = async () => {
    await clear()
    await navigateTo('/auth/login')
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
    { label: t('menu.dashboard', 'Dashboard'), icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
    { label: t('menu.users', 'Users'), icon: 'i-heroicons-users', to: '/users' },
    { label: t('menu.reports', 'Reports'), icon: 'i-heroicons-chart-bar', to: '/reports' },
    { label: t('menu.settings', 'Settings'), icon: 'i-heroicons-cog-6-tooth', to: '/settings' },
  ])

  const userItems = computed<DropdownMenuItem[][]>(() => [
    [
      { label: t('menu.profile', 'Profil'), icon: 'i-lucide-user' },
      { label: t('menu.settings', 'Pengaturan'), icon: 'i-lucide-settings', to: '/settings' }
    ],
    [
      {
        label: t('menu.theme', 'Tema'),
        icon: 'i-lucide-sun-moon',
        children: [
          {
            label: t('menu.switch_to_light', 'Terang'),
            icon: 'i-lucide-sun',
            type: 'checkbox',
            checked: colorMode.value === 'light',
            onUpdateChecked(checked: boolean) {
              if (checked) colorMode.preference = 'light'
            },
            onSelect(e: Event) { e.preventDefault() }
          },
          {
            label: t('menu.switch_to_dark', 'Gelap'),
            icon: 'i-lucide-moon',
            type: 'checkbox',
            checked: colorMode.value === 'dark',
            onUpdateChecked(checked: boolean) {
              if (checked) colorMode.preference = 'dark'
            },
            onSelect(e: Event) { e.preventDefault() }
          },
        ]
      }
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
