import {
    BadRequestException,
    ForbiddenException, HttpException, HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {Prisma, Role, User} from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'

import { PrismaService } from 'prisma/prisma.service'
import { AuthSignInDto } from './dto/auth.dto'
import { UserResponse } from './auth.types'


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    hashPassword = async (password: string) => await bcrypt.hash(password, 10)
    comparePasswords = async (args: { hash: string, password: string }) => await bcrypt.compare(args.password, args.hash)
    signToken = async (args: { userId: number, login: string, role: Role, period: number }) => await this.jwt.signAsync(
        {id: args.userId, login: args.login, role: args.role},
        {secret: process.env.JWT_SECRET, expiresIn: 60 * 60 * args.period})

    async user(userData: AuthSignInDto, res: Response): Promise<Response> {
        const { login, password, remember } = userData

        const foundUser: User | never = await this.prisma.user.findUnique({where: {login}})

        if (!foundUser) {
            throw new NotFoundException('Пользователь не найден.')
        }

        const compareSuccess = await this.comparePasswords({
            password,
            hash: foundUser.password,
        })

        if (!compareSuccess) {
            throw new UnauthorizedException('Неверный логин/пароль.')
        }
        // TODO Переделать, чтобы максимальный период расчитывался от последнего изменения пароля
        const period = remember ? 30 : 7
        const token = await this.signToken(
            {
                userId: foundUser.id,
                login: foundUser.login,
                role: foundUser.role,
                period: period * 24
            })

        if (!token) {
            throw new ForbiddenException('Ошибка авторизации.')
        }

        return res.send({role: foundUser.role, token: token})
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const { login, password } = data

        const userExists = await this.prisma.user.findUnique({where: {login}})

        if (userExists) {
            throw new BadRequestException('Login already exists')
        }

        const hashedPassword = await this.hashPassword(password)

        return await this.prisma.user.create({
            data: {
                login,
                password: hashedPassword
            }
        })
    }

    async users(params: {
        skip?: number
        take?: number
        cursor?: Prisma.UserWhereUniqueInput
        where?: Prisma.UserWhereInput
        orderBy?: Prisma.UserOrderByWithRelationInput
    }): Promise<UserResponse[]> {
        const { skip, take, cursor, where, orderBy } = params

        return this.prisma.user.findMany({
            select: {
                id: true,
                login: true,
                role: true,
                createdAt: true,
                updateAt: true
            },
        })
    }

    async userByLogin(login: string): Promise<UserResponse> {
        try {
            const foundUser: UserResponse | never = await this.prisma.user.findUnique({
                where: {
                    login,
                },
                select: {
                    id: true,
                    login: true,
                    role: true,
                    createdAt: true,
                    updateAt: true
                },
            })
            if (!foundUser) {
                throw new NotFoundException('Not found user')
            }
            return foundUser
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput
        data: Prisma.UserUpdateInput
    }): Promise<User> {
        const { where, data } = params
        return this.prisma.user.update({
            data,
            where,
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        })
    }
}