import {Injectable} from '@nestjs/common'

import {PrismaService} from '../../prisma/prisma.service'
import {Role} from '../auth/roles/roles.enum'
import {AuthWsDecorator} from "../auth/ws/ws.decorator";
import {UserAuthDecorator} from "../auth/auth.types";

type TChat = {
    id: number
    userId: number
    role: 'ADMIN' | 'USER'
    message: string
    createdAt: Date
}

type TMessageCreate = {
    userId: number
    role: Role
    message: string
}

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async updLastVisit(userId: number, status: boolean) {
        await this.prisma.chat_last_visit.upsert({
            where: {
                userId: userId
            },
            update: {
                connect: status
            },
            create: {
                userId: userId
            }
        })
    }

    async getMessages(myId: number): Promise<TChat[]> {
        return this.prisma.chat.findMany({
            select: {
                id: true,
                userId: true,
                role: true,
                message: true,
                createdAt: true
            },
            where: {
                userId: myId,
                archive: false
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
    }

    async createMessage(data: TMessageCreate): Promise<TChat> {
        return this.prisma.chat.create({
            data: {
                userId: data.userId,
                role: data.role,
                message: data.message,
            },
            select: {
                id: true,
                userId: true,
                user: {
                    select: {
                        login: true
                    }
                },
                role: true,
                message: true,
                createdAt: true
            }
        })
    }

    async readMessages(userId: number): Promise<any> {
        return this.prisma.chat.updateMany({
            where: {
                status: false,
                archive: false,
                userId: userId
            },
            data: {
                status: true
            }
        })
    }
    async getDialogs(user: UserAuthDecorator): Promise<any> {
        const dialogs = await this.prisma.chat_last_visit.findMany({
            select: {
                user: {
                    select: {
                        id: true,
                        login: true
                    }
                },
                connect: true,
                updateAt: true,
            },
            where: {
                user: {
                    role: {
                        equals: user.role === 'ADMIN' ? 'USER' : 'ADMIN'
                    }
                }
            },
            orderBy: {
                updateAt: 'desc'
            }
        })

        const newMessages = await this.prisma.chat.groupBy({
            by: ['userId'],
            where: {
                archive: false,
                status: false,
                user: {
                    role: {
                        equals: user.role === 'ADMIN' ? 'USER' : 'ADMIN'
                    }
                }
            },
            _count: {
                userId: true
            }
        })

        return dialogs.map((d) => {
            const count = newMessages.filter((m) => m.userId === d.user.id)
            const date = `${d.updateAt.getDate()}.${d.updateAt.getMonth() + 1}.${d.updateAt.getFullYear()}`
            return {
                ...d,
                date: date,
                count: count.length ? count[0]._count.userId : 0
            }
        })
    }
}