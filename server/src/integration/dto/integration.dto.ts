import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBalanceBankDto {
    @IsNotEmpty()
    @IsString()
    readonly ind_tax_number

    @IsNotEmpty()
    @IsString()
    readonly code

    @IsNotEmpty()
    @IsNumber()
    readonly value
}