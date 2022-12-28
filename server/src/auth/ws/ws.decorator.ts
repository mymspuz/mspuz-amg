import { BadRequestException, createParamDecorator } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserAuthDecorator } from '../auth.types'

export const AuthWsDecorator = createParamDecorator((_, request: any): UserAuthDecorator => {
    const client = request.switchToWs().getClient()
    if (!client.handshake.headers?.authorization) {
        throw new BadRequestException()
    }

    const token = client.handshake.headers.authorization.split(' ')[1]

    const jwt: JwtService = new JwtService()
    try {
        const decoded = jwt.verify(token, { secret: process.env.JWT_SECRET }) as any
        return { id: decoded.id, login: decoded.login, role: decoded.role }
    } catch (e) {
        throw new BadRequestException()
    }
})