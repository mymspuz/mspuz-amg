import { TRole } from './AuthTypes'

export interface IChatMessage {
    id: number
    userId: number
    message: string
    createdAt: string
    role?: TRole
}
export interface IChatMessages {
    id: number
    messages: IChatMessage[]
}

export interface IChatUser {
    id: number
    avatar: string
    name: string
    description?: string
    period: string
    newMessage: number
    connect?: boolean
}

export interface IChatDialog {
    user: IChatUser
    messages: IChatMessage[]
}

export interface IChatState {
    dialogs: IChatDialog[]
    selectDialog: number
}

export interface IChatNewMessageResponse {
    id: number
    userId: number
    user: {
        login: string
    }
    role: TRole
    message: string
    createdAt: string
}