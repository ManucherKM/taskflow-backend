import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import { join } from 'path'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 5000

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	)

	app.setGlobalPrefix('api')

	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

	app.enableCors({ origin: '*' })

	await app.listen(PORT)
}

bootstrap()
