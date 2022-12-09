import { Role } from '@prisma/client'

export type UserResponse = {
    id: number
    login: string
    role: Role
    createdAt: Date
    updateAt: Date
}