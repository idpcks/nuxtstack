export interface Permission {
    id: number
    name: string
    group: string
    description?: string
}

export type CreatePermissionDto = Omit<Permission, 'id'>

export type UpdatePermissionDto = Partial<Permission>