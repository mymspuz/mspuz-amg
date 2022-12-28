import { Module } from '@nestjs/common'

import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import {JwtService} from "@nestjs/jwt";

@Module({
    providers: [ChatService, ChatGateway, JwtService],
    controllers: []
})

export class ChatModule {}