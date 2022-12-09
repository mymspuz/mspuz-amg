import { Module } from '@nestjs/common'
import { StatementsService } from './statements.service'
import { StatementsController } from './statements.controller'
import { FileService } from '../../service/file/file.service'
import { EmailService } from '../../service/email/email.service'

@Module({
  providers: [StatementsService, FileService, EmailService],
  controllers: [StatementsController]
})
export class StatementsModule {}
