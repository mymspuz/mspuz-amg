import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {PrismaService} from "../../prisma/prisma.service";
import {CreateBalanceBankDto} from "./dto/integration.dto";

type TBalanceBank = {
    id: number
    value: number
    updateAt: Date
}

@Injectable()
export class IntegrationService {
    constructor(
        private prisma: PrismaService
    ) {}

    async createBalanceBank(data: CreateBalanceBankDto): Promise<boolean> {
        try {
            // Found user
            const foundUser: { userId: number } | never = await this.prisma.profile.findFirst({
                where: {
                    ind_tax_number: data.ind_tax_number
                },
                select: {
                    userId: true
                }
            })
            if (!foundUser) {
                return false
            }

            // Found indicator
            const foundIndicator: { id: number } | never = await this.prisma.indicators.findFirst({
                where: {
                    code: data.code
                },
                select : {
                    id: true
                }
            })
            if (!foundIndicator) {
                return false
            }

            // Create record in register
            await this.prisma.accounting_register.create({
                data: {
                    userId: foundUser.userId,
                    indicatorId: foundIndicator.id,
                    value: data.value
                }
            })
            return true
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getBalanceBankLast(userId: number, code: any): Promise<TBalanceBank | null> {
        if (!code.code) {
            return null
        }

        try {
            const foundIndicator: { id: number} | never = await this.prisma.indicators.findFirst({
                where: {
                    code: code.code
                },
                select: {
                    id: true
                }
            })

            if (!foundIndicator) {
                return null
            }

            const foundBalance = this.prisma.accounting_register.findFirst({
                where: {
                    userId,
                    indicatorId: foundIndicator.id
                },
                orderBy: {
                    updateAt: 'desc'
                },
                select: {
                    id: true,
                    value: true,
                    updateAt: true
                }
            })
            if (foundBalance) {
                return foundBalance
            } else {
                return null
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
