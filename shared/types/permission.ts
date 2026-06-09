import { z } from 'zod'
import { permissionSchema } from '../utils/validations'

export type Permission = z.infer<typeof permissionSchema>

export type CreatePermissionDto = Omit<Permission, 'id'>

export type UpdatePermissionDto = Partial<Permission>