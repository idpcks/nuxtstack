import type { userSchema } from '#shared/utils/validations'
import type { z } from 'zod'

/**
 * Tipe form untuk User, bersumber dari Zod schema (Single Source of Truth).
 * Lihat: shared/utils/validations.ts -> userSchema
 */
export type UserForm = z.infer<typeof userSchema>
