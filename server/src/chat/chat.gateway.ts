import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { UseGuards } from '@nestjs/common'
import { Server, Socket } from 'socket.io'

import { ChatService } from './chat.service'
import { Role } from '../auth/roles/roles.enum'
import { WsGuard } from '../auth/ws/ws.guard'
import { AuthWsDecorator } from '../auth/ws/ws.decorator'
import { UserAuthDecorator } from '../auth/auth.types'

const users: Record<string, string> = {}

@WebSocketGateway({
    cors: {
        origin: '*'//process.env.CLIENT_URL
    },
    serverClient: false,
    namespace: 'amg-chat'
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer() server: Server

    @UseGuards(WsGuard)
    @SubscribeMessage('messages:get')
    async handleMessagesGet(
        @AuthWsDecorator() user: UserAuthDecorator,
        @MessageBody() payload: { id: number }
    ): Promise<void> {
        const messages = await this.chatService.getMessages(payload.id)
        this.server.emit(`messages_${user.id}`, { id: payload.id, messages })
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('message:post')
    async handleMessagePost(
        @AuthWsDecorator() user: UserAuthDecorator,
        @MessageBody() payload: { userId: number, role: Role, message: string }
    ): Promise<void> {
        const createdMessage = await this.chatService.createMessage(payload)
        this.server.emit(`newMessage_${payload.userId}`, createdMessage)
        if (user.role === 'ADMIN') {
            this.server.emit(`newMessage_${user.id}`, createdMessage)
        } else {
            this.server.emit('newMessageAdmin', createdMessage)
        }
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('messages:read')
    async handleMessagesRead(
        @MessageBody() payload: { userId: number }
    ): Promise<void> {
        await this.chatService.readMessages(payload.userId)
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('dialogs:get')
    async handleDialogsGet(
        @AuthWsDecorator() user: UserAuthDecorator,
    ): Promise<void> {
        const dialogs = await this.chatService.getDialogs(user)
        this.server.emit(`dialogs_${user.id}`, dialogs)
    }

    afterInit(server: Server): void {
        console.log(server)
    }

    handleConnection(client: Socket, ...args: any[]): void {
        console.log('connected...')
        const userId = client.handshake.query.userId
        const userName = client.handshake.query.userName as string
        this.chatService.updLastVisit(Number(userId), true).then(() => {
            const socketId = client.id
            users[socketId] = userName
            console.log(`${userName} connected...`)
        })

        client.broadcast.emit('log', { id: Number(userId), connect: true })
    }

    handleDisconnect(client: Socket): void {
        console.log('disconnected...')
        const socketId = client.id
        const userId = client.handshake.query.userId
        const userName = users[socketId]
        this.chatService.updLastVisit(Number(userId), false).then(() => {
            delete users[socketId]
            console.log(`${userName} disconnected...`)
        })

        client.broadcast.emit('log', { id: Number(userId), connect: false })
    }
}