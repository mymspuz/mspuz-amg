import {Body, Controller, Get, Post, Query} from '@nestjs/common'

import { Integration1сService } from './integration1с.service'

@Controller('1c')
export class Integration1сController {
    constructor(private integration1CService: Integration1сService) {}

    @Post()
    setInfoClient(
        @Body() body
    ) {
        console.log(body)
        return { result: 'ok' }
    }

}