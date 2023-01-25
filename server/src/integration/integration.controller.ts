import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common'

import { IntegrationService } from './integration.service'
import { CreateBalanceBankDto } from './dto/integration.dto'
import JwtAuthGuard from '../auth/jwt-authentication.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { User } from '../service/decorators'

@Controller('1c')
export class IntegrationController {
    constructor(private integration1CService: IntegrationService) {}

    @Post()
    createBalanceBank(
        @Body() dto: CreateBalanceBankDto
    ) {
        console.log(dto)
        return this.integration1CService.createBalanceBank(dto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getBalanceBankLast(
        @Query() code: string,
        @User() user
    ) {
        return this.integration1CService.getBalanceBankLast(user.id, code)
    }

}