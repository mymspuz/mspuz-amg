import {IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator'
import { TypeDocs } from '../../service/file/file.service'

export class CreateDocsDto {
    @IsNotEmpty()
    @IsString()
    readonly type: TypeDocs

    @IsNotEmpty()
    @IsString()
    readonly filename
}

export class GetDocsDto {
    @IsOptional()
    @IsString()
    readonly typeDoc: TypeDocs

    @IsOptional()
    @IsString()
    readonly userName

    @IsOptional()
    @IsDateString()
    readonly dateAfter

    @IsOptional()
    @IsDateString()
    readonly dateBefore

    @IsOptional()
    @IsNumberString()
    readonly statusDoc
}

export class ChangeStatusDocDto {
    @IsNotEmpty()
    @IsNumber()
    readonly docId

    @IsNotEmpty()
    @IsNumber()
    readonly statusId
}