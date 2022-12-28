import { CanActivate, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '../../../prisma/prisma.service'
import { Role } from '../roles/roles.enum'

@Injectable()
export class RolesWSGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async canActivate(context: any) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) {
            return true
        }

        const client = context.switchToWs().getClient()
        if (!client.handshake.headers?.authorization) {
            return false
        }

        const token = client.handshake.headers.authorization.split(' ')[1]
        const decodedToken = this.jwt.decode(token)
        return requiredRoles.some((role) => role === decodedToken['role'])
    }
}