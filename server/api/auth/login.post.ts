export default defineEventHandler(async (event) => {
  // Tangkap request dan validasi menggunakan skema Zod dari folder shared/
  const body = await readValidatedBody(event, (b) => loginSchema.parse(b))
  
  const { email, password } = body
  const config = useRuntimeConfig()

  try {
    // Request ke Backend (Agnostik)
    // Di sini kita menembak ke endpoint login backend, misalnya: /api/login
    // Anda bisa mengubah path endpoint jika backend menggunakan path berbeda (misal: /v1/auth/login)
    const response = await $fetch<any>('/login', {
      baseURL: config.public.apiBaseUrl as string,
      method: 'POST',
      body: {
        email,
        password
      }
    })

    // Asumsi: backend mengembalikan { token: '...', user: { id: 1, name: '...', email: '...', role: 'Admin' } }
    const token = response.token || response.access_token
    const userData = response.user || { id: 1, name: 'Admin', email, role: 'Admin' }

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Token otentikasi tidak ditemukan dari server'
      })
    }

    // Simpan session beserta token agar aman terenkripsi di sisi server (Nuxt)
    await setUserSession(event, {
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        token: token
      },
      loggedInAt: new Date()
    })

    return { success: true }

  } catch (error: any) {
    // Jika backend menolak (misal password salah), maka lempar kembali errornya
    const statusCode = error.response?.status || 401
    const message = error.response?._data?.message || 'Email atau password salah'
    
    throw createError({
      statusCode,
      message
    })
  }
})