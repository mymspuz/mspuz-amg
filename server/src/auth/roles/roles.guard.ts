import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from './roles.enum'
import {User} from "@prisma/client";
import {PrismaService} from "../../../prisma/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        const id = user.id

        let foundUser: User | never

        foundUser = await this.prisma.user.findUnique({ where: { id } })

        return requiredRoles.some((role) => foundUser.role.includes(role))
    }
}