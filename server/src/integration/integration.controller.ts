import {Body, Controller, Get, Post, Query} from '@nestjs/common'

import { IntegrationService } from './integration.service'

@Controller('1c')
export class IntegrationController {
    constructor(private integration1CService: IntegrationService) {}

    @Post()
    setInfoClient(
        @Body() body
    ) {
        console.log(body)
        return { result: 'ok' }
    }

}