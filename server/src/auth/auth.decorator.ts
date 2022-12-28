import { BadRequestException, createParamDecorator } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export const AuthDecorator = createParamDecorator((_, request: any) => {
    const { authorization } = request.headers
    const jwt: JwtService = new JwtService()
    try {
        const decoded = jwt.verify(authorization, { secret: process.env.JWT_SECRET }) as any
        return { id: decoded.id, login: decoded.login, role: decoded.role }
    } catch (e) {
        throw new BadRequestException()
    }
})