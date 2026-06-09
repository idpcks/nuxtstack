import { z } from 'zod'
import { roleSchema } from '../utils/validations'

export type Role = z.infer<typeof roleSchema>
