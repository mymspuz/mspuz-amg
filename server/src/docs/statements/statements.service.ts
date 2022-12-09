import {HttpException, HttpStatus, Injectable, StreamableFile} from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import { createReadStream } from 'fs'
import * as JSZip from 'jszip'

import { FileService, TypeDocs, TGetDocs } from '../../service/file/file.service'
import { CreateDocsDto, GetDocsDto } from '../dto/docs.dto'
import { PrismaService } from '../../../prisma/prisma.service'
import { Role } from '../../auth/roles/roles.enum'
import { EmailService } from '../../service/email/email.service'

@Injectable()
export class StatementsService {
    constructor(
        private fileService: FileService,
        private prisma: PrismaService,
        private sendEmail: EmailService,
    ) {}

    async create(doc: Express.Multer.File, user: { id: number, login: string }, fileInfo: CreateDocsDto): Promise<TGetDocs> {
        try {
            const foundDoc: { id: number } | never = await this.prisma.loaddocs.findFirst({
                where: {
                    userId: user.id,
                    type: fileInfo.type,
                    name: fileInfo.filename
                },
                select: {
                    id: true
                }
            })

            if (foundDoc) {
                throw new HttpException('Уже существует такой файл.', HttpStatus.CONFLICT)
            }

            const { fileName, fileSize } = this.fileService.createFile(fileInfo.type, user.login, doc)

            this.sendEmail.docsAddRemove(fileInfo.filename, 'create', user.login)

            return await this.prisma.loaddocs.create({
                data: {
                    type: fileInfo.type,
                    name: fileInfo.filename,
                    servername: fileName,
                    size: fileSize,
                    userId: user.id,
                    status: 1
                },
                select: {
                    id: true,
                    type: true,
                    name: true,
                    size: true,
                    user: {
                        select: {
                            id: true,
                            login: true
                        }
                    },
                    updateAt: true,
                    status: true
                }
            })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(params: GetDocsDto, userId: number): Promise<TGetDocs[]> {
        try {
            const foundUser: { role: string } | never = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } })

            let where: any = foundUser.role === Role.Admin ? {} : { userId: userId }

            if (!params.typeDoc) {
                if (foundUser.role === Role.User) {
                    throw new HttpException('Укажите тип документа.', HttpStatus.FORBIDDEN)
                }
            } else {
                where = {
                    ...where,
                    type: {
                        equals: params.typeDoc
                    }
                }
            }

            if (params.userName) {
                where = {
                    ...where,
                    user: {
                        login: {
                            contains: params.userName
                        }
                    }
                }
            }

            if (params.dateAfter) {
                where = {
                    ...where,
                    updateAt: {
                        gte: params.dateAfter
                    }
                }
            }

            if (params.dateBefore) {
                where = {
                    ...where,
                    updateAt: {
                        lte: params.dateBefore
                    }
                }
            }

            if (params.statusDoc) {
                where = {
                    ...where,
                    status: Number(params.statusDoc)
                }
            }

            return await this.prisma.loaddocs.findMany({
                select: {
                    id: true,
                    type: true,
                    name: true,
                    size: true,
                    user: {
                        select: {
                            id: true,
                            login: true
                        }
                    },
                    updateAt: true,
                    status: true
                },
                where
            })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeDoc(docId: number, userId: number, userName: string): Promise<{ id: number }> {
        try {
            let foundUser: { role: string } | never

            foundUser = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } })

            const where = foundUser.role === Role.Admin ? { id: docId } : { id: docId, userId: userId }

            const foundDoc: {
                id: number,
                type: string,
                servername: string,
                name: string
            } | never = await this.prisma.loaddocs.findFirst({
                where,
                select: {
                    id: true,
                    type: true,
                    servername: true,
                    name: true
                }
            })

            if (!foundDoc) {
                throw new HttpException('Файл не найден.', HttpStatus.NOT_FOUND)
            }

            const filePath = path.resolve(
                __dirname,
                '..',
                '..',
                'documents',
                userName,
                foundDoc.type,
                foundDoc.servername
            )

            if (fs.existsSync(filePath)) {
                this.fileService.removeFile(userName, foundDoc.type as TypeDocs, foundDoc.servername)
            }

            this.sendEmail.docsAddRemove(foundDoc.name, 'remove', userName)

            return await this.prisma.loaddocs.delete({
                where: {
                    id: docId
                },
                select: {
                    id: true
                }
            })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getDocFile(docId: number, userId: number, userName: string): Promise<any> {
        try {
            let foundUser: { role: string } | never

            foundUser = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } })

            const where = foundUser.role === Role.Admin ? { id: docId } : { id: docId, userId: userId }

            const foundDoc: {
                id: number,
                type: string,
                servername: string,
                name: string,
                user: { login: string }
            } | never = await this.prisma.loaddocs.findFirst({
                where,
                select: {
                    id: true,
                    type: true,
                    servername: true,
                    name: true,
                    user: { select: { login: true } }
                }
            })

            if (!foundDoc) {
                throw new HttpException('Файл не найден.', HttpStatus.NOT_FOUND)
            }

            const filePath = path.resolve(
                __dirname,
                '..',
                '..',
                'documents',
                foundDoc.user.login,
                foundDoc.type,
                foundDoc.servername
            )

            if (!fs.existsSync(filePath)) {
                throw new HttpException('Файл не найден.', HttpStatus.NOT_FOUND)
            }

            const zip = new JSZip()
            const docs = zip.folder('docs')
            const file = docs.file(foundDoc.name, createReadStream(filePath))

            const generatedZip = await file.generateAsync({ type: "nodebuffer" })

            return new StreamableFile(generatedZip)

        } catch (e) {
            if ('status' in e) {
                throw new HttpException(e.response, e.status)
            } else {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async changeStatus(docId: number, statusId: number): Promise<{ id: number, status: number }> {
        if (statusId < 0 || statusId > 3) {
            throw new HttpException('Недопустимый статус.', HttpStatus.BAD_REQUEST)
        }
        try {
            await this.prisma.loaddocs.findFirstOrThrow({ where: { id: docId }, select: { id: true } })

            return await this.prisma.loaddocs.update({
                where: { id: docId },
                data: { status: statusId },
                select: { id: true, status: true }
            })
        } catch (e) {
            if (e.message === 'No Loaddocs found') {
                throw new HttpException('Документ не найден.', HttpStatus.NOT_FOUND)
            }
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}