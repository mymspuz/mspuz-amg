import {IsBoolean, IsNotEmpty, IsString, Length} from 'class-validator'

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    @Length(10, 10, { message: 'Login has to be at 10 chars' })
    public login: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
    public password: string
}

export class AuthSignInDto {
    @IsNotEmpty()
    @IsString()
    @Length(10, 10, { message: 'Login has to be at 10 chars' })
    public login: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
    public password: string

    @IsNotEmpty()
    @IsBoolean()
    public remember: boolean
}

export class AuthSignUpDto {
    @IsNotEmpty()
    @IsString()
    @Length(10, 10, { message: 'Login has to be at 10 chars' })
    public login: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
    public password: string
}