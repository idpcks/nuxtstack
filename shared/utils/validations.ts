import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi')
})

export const accountSchema = z.object({
  fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
  email: z.string().email('Format email tidak valid')
})

export const securitySchema = z.object({
  oldPassword: z.string().min(1, 'Password lama wajib diisi'),
  newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
})

export const roleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nama peran wajib diisi!'),
  description: z.string().optional(),
  status: z.boolean()
})

export const permissionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Nama permission wajib diisi!'),
  group: z.string().min(1, 'Group permission wajib diisi!'),
  description: z.string().optional()
})

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  role: z.enum(['Admin', 'Editor', 'Viewer']),
  status: z.boolean(),
  createdAt: z.string().optional()
})
