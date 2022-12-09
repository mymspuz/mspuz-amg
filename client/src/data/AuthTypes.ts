export const Role = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    NO: ''
}

export type TRole = (typeof Role)[keyof typeof Role]

export type TAuthResponse = {
    role: TRole
    token: string
}

export type UserResponse = {
    id: number
    login: string
    role: TRole
    createdAt: Date
    updateAt: Date
}

export type TAuthLocalstorage = {
    token: string
}