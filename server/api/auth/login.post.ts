export default defineEventHandler(async (event) => {
  // Tangkap request dan validasi menggunakan skema Zod dari folder shared/
  // Jika gagal, Nuxt otomatis merespons HTTP 400 Bad Request!
  const body = await readValidatedBody(event, (b) => loginSchema.parse(b))
  
  // Karena sudah divalidasi, TypeScript 100% yakin variabel ini aman
  const { email, password } = body

  // TODO: ganti dengan query ke database kamu
  // Contoh hardcode dulu untuk testing:
  const mockUser = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123' // nanti pakai bcrypt
  }

  const isMatch =
    (email === mockUser.email) &&
    password === mockUser.password

  if (!isMatch) {
    throw createError({
      statusCode: 401,
      message: 'Email atau password salah'
    })
  }

  // Simpan session
  await setUserSession(event, {
    user: {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    },
    loggedInAt: new Date()
  })

  return { success: true }
})