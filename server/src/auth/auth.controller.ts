import {Body, Controller, HttpCode, Get, Post, Response, UseGuards, Request, Param} from '@nestjs/common'
import e from 'express'

import { AuthService } from './auth.service'
import { User as UserModel } from '@prisma/client'
import { AuthDto, AuthSignInDto } from './dto/auth.dto'
import { Roles } from './roles/roles.decorator'
import { Role } from './roles/roles.enum'
import { UserResponse } from './auth.types'
import { RolesGuard } from './roles/roles.guard'
import JwtAuthGuard from './jwt-authentication.guard'
import { User } from '../service/decorators'

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('signup')
  async signupUser(@Body() userData: AuthDto): Promise<UserModel> {
    return this.authService.createUser(userData)
  }

  @Post('signin')
  @HttpCode(200)
  async signinUser(@Body() userData: AuthSignInDto, @Response() response): Promise<e.Response> {
    return this.authService.user(userData, response)
  }

  @Get('users')
  getUsers(): Promise<UserResponse[]> {
    return this.authService.users({})
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getUserByLogin(@User() user): Promise<UserResponse> {
    return this.authService.userByLogin(user.login)
  }


}
