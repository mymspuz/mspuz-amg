import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CLIENT_URL, credentials: true }
  })

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(process.env.SERVER_PORT)
  console.log(`mode: ${process.env.NODE_ENV} port: ${process.env.SERVER_PORT} client: ${process.env.CLIENT_URL}`)
}

bootstrap()
