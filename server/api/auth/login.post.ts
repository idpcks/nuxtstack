export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Validasi input
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email dan password wajib diisi'
    })
  }

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