import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public docsAddRemove(fileName: string, operation: string, userName: string): void {
        this.mailerService
            .sendMail({
                to: 'ms_puz@mail.ru',
                from: 'mspuz@yandex.ru',
                subject: `AMG Server - [${operation}] file.`,
                text: 'welcome', // plaintext body
                html: `<b>${userName}</b></br>${operation} - ${fileName}`,
            })
            .then(() => {
                console.log('email send')
            })
            .catch((e) => {
                console.log(e)
            })
    }
}