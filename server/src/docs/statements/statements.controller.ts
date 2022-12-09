import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    Put,
    Query,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import {FileInterceptor} from '@nestjs/platform-express'
import type {Response} from 'express'

import {StatementsService} from './statements.service'
import {ChangeStatusDocDto, CreateDocsDto, GetDocsDto} from '../dto/docs.dto'
import JwtAuthGuard from '../../auth/jwt-authentication.guard'
import {RolesGuard} from '../../auth/roles/roles.guard'
import {User} from '../../service/decorators'
import {Roles} from '../../auth/roles/roles.decorator'
import {Role} from '../../auth/roles/roles.enum'

@Controller('docs')
export class StatementsController {
    constructor(private statementsService: StatementsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('doc'))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateDocsDto,
        @User() user
    ) {
        return this.statementsService.create(file, user, dto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(
        @Query() querys: GetDocsDto,
        @User() user
    ) {
        return this.statementsService.getAll(querys, user.id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(
        @Param() { id }: { id: number },
        @User() user
    ) {
        return this.statementsService.removeDoc(Number(id), user.id, user.login)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/download/:id')
    @Header('Content-Type', 'application/zip')
    @Header('Content-Disposition', 'attachment; filename="docs.zip"')
    getDocFile(
        @Param() { id }: { id: number },
        @User() user,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.statementsService.getDocFile(Number(id), user.id, user.login)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put()
    changeStatus(
        @Body() dto: ChangeStatusDocDto,
        @User() user
    ) {
        return this.statementsService.changeStatus(dto.docId, dto.statusId)
    }

}
