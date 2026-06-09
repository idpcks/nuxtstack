declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    email: string
    role: string
  }

  interface SecureSessionData {
    accessToken: string
  }
}

export {}
