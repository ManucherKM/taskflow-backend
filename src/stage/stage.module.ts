import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Stage, StageSchema } from './entities/stage.entity'
import { StageController } from './stage.controller'
import { StageService } from './stage.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Stage.name, schema: StageSchema }]),
	],
	controllers: [StageController],
	providers: [StageService],
})
export class StageModule {}
