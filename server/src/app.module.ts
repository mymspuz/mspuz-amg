import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/jwt.strategy'
import { FileModule } from './service/file/file.module'
import { StatementsModule } from './docs/statements/statements.module'
import { EmailModule } from './service/email/email.module'
import { Integration1сModule } from './integration1с/integration1с.module'

@Module({
  imports: [
      MailerModule.forRootAsync({
          useFactory: () => ({
              transport: process.env.EMAIL_CONNECT_URL,
              defaults: {
                  from: 'AMG server',
              },
          }),
      }),
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: !process.env.NODE_ENV ? '.env' : [`.env.${process.env.NODE_ENV}`]
      }),
      PrismaModule,
      AuthModule,
      FileModule,
      EmailModule,
      StatementsModule,
      Integration1сModule,
  ],
  controllers: [],
  providers: [
      JwtStrategy,
  ],
})
export class AppModule {}
