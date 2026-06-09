import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export function useApiClient<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const defaults: UseFetchOptions<T> = {
    baseURL: '/api',
    key: typeof url === 'function' ? url() : url,
    onResponseError({ response }) {
      // Penanganan error secara terpusat
      const toast = useAppToast()
      const { clear } = useUserSession()

      if (response.status === 401) {
        toast.showError('Sesi anda telah berakhir. Silakan login kembali.')
        clear().then(() => {
          navigateTo(AppRoutes.LOGIN)
        })
      } else if (response.status === 403) {
        toast.showError('Anda tidak memiliki akses ke fitur ini.')
      } else {
        const errorMsg = (response._data as any)?.message || 'Terjadi kesalahan pada server'
        toast.showError(errorMsg)
      }
    }
  }

  // Menggabungkan opsi default dengan opsi spesifik
  const params = defu(options, defaults)

  return useFetch(url, params)
}
