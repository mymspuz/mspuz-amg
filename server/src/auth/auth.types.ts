import { Role } from '@prisma/client'

export type UserResponse = {
    id: number
    login: string
    role: Role
    createdAt: Date
    updateAt: Date
}

export type JwtPayload = {
    id: number
    login: string
    role: Role
    iat: Date
    exp: Date
}

export type UserAuthDecorator = {
    id: number
    login: string
    role: Role
}