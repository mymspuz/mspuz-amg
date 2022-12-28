import { CanActivate, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

import { PrismaService } from '../../../prisma/prisma.service'

@Injectable()
export class WsGuard implements CanActivate{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    canActivate(context: any): boolean | Promise<boolean | any> | Observable<boolean | any> {
        const client = context.switchToWs().getClient()
        if (!client.handshake.headers?.authorization) {
            return false
        }

        const token = client.handshake.headers.authorization.split(' ')[1]
        try {
            const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET }) as any
            return new Promise((resolve, reject) => {
                return this.prisma.user.findUnique({where: { login: decoded.login }})
                    .then(user => user ? resolve(user) : reject(false))
            })
        } catch (e) {
            return false
        }
    }
}