import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { FileModule } from './file/file.module'
import { JwtModule } from './jwt/jwt.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		JwtModule,
		UserModule,
		FileModule,
	],
	controllers: [AppController],
})
export class AppModule {}
