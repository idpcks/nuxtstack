import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export function useApiClient<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const { user } = useUserSession()
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl as string,
    key: typeof url === 'function' ? url() : url,
    onRequest({ options }) {
      // Menambahkan Authorization Bearer Token jika user memiliki session
      if (user.value && user.value.token) {
        const headers = new Headers(options.headers as HeadersInit)
        headers.set('Authorization', `Bearer ${user.value.token}`)
        options.headers = headers
      }
    },
    onResponseError({ response }) {
      // Penanganan error secara terpusat
      const toast = useAppToast()
      const { clear } = useUserSession()
      
      if (response.status === 401) {
        toast.showError('Sesi anda telah berakhir. Silakan login kembali.')
        clear().then(() => {
          navigateTo('/login')
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
