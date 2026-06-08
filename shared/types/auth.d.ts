declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    email: string
    role: string
    token: string
  }
}

export {}
