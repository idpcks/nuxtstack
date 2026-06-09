export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const token = session.secure?.accessToken

  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized: Sesi tidak valid atau telah berakhir.' })
  }

  // Menghapus '/api' di awal path request agar bisa diteruskan ke backend.
  // Contoh: '/api/users?page=1' menjadi '/users?page=1'
  const path = event.path.replace(/^\/api/, '')
  const config = useRuntimeConfig()

  return proxyRequest(event, `${config.public.apiBaseUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
