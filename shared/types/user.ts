import { z } from 'zod'
import { userSchema } from '../utils/validations'

export type User = z.infer<typeof userSchema>
