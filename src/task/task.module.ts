import { StageModule } from '@/stage/stage.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './entities/task.entity'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
		StageModule,
	],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {}
