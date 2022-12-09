import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import * as path from 'path'
import * as fs from 'fs'

export type TypeDocs = 'statements' | 'purchase' | 'sales' | 'personal'

export type TGetDocs = {
    id: number
    type: string
    name: string
    size: string
    user: { id: number, login: string }
    updateAt: Date
    status: number
}

@Injectable()
export class FileService {
    formatBytes(bytes: number, decimals: number = 2): string {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    createFile(type: TypeDocs, userName: string, file: Express.Multer.File): { fileName: string, fileSize: string } {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = `${randomUUID()}.${fileExtension}`
            const filePath = path.resolve(__dirname, '..', '..', 'documents', userName, type)
            const fileSize = this.formatBytes(file.size)

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return { fileName, fileSize }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(userName: string, type: TypeDocs, fileName: string): boolean {
        try {
            const filePath = path.resolve(__dirname, '..', '..', 'documents', userName, type, fileName)
            fs.unlinkSync(filePath)
            return true
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
