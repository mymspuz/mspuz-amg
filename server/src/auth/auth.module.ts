import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { RolesGuard } from './roles/roles.guard'
import JwtAuthGuard from './jwt-authentication.guard'
import { RolesWSGuard } from './ws/rolesWs.guard'

@Module({
  imports: [
      JwtModule.register({
          signOptions: { expiresIn: '6000s' },
          secret: process.env.JWT_SECRET,
      }),
      PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, RolesWSGuard, JwtAuthGuard, JwtStrategy]
})

export class AuthModule {}