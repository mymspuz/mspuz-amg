import { createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator((data, req) => {
    const { id, login } = req.switchToHttp().getRequest().user
    return { id, login }
})