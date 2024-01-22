import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ActivationModule } from './activation/activation.module'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { BoardModule } from './board/board.module'
import { FileModule } from './file/file.module'
import { JwtModule } from './jwt/jwt.module'
import { StageModule } from './stage/stage.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		MailerModule.forRoot({
			transport: {
				host: process.env.NODEMAILER_SMTP_HOST,
				auth: {
					user: process.env.NODEMAILER_USER,
					pass: process.env.NODEMAILER_PASSWORD,
				},
			},
		}),
		JwtModule,
		UserModule,
		FileModule,
		AuthModule,
		ActivationModule,
		BoardModule,
		StageModule,
		TaskModule,
	],
	controllers: [AppController],
})
export class AppModule {}
