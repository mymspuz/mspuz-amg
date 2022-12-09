import { Module } from '@nestjs/common'
import { Integration1сController } from './integration1с.controller'
import { Integration1сService } from './integration1с.service'

@Module({
  controllers: [Integration1сController],
  providers: [Integration1сService]
})
export class Integration1сModule {}
