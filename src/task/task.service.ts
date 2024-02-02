import { StageService } from '@/stage/stage.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(Task.name) private readonly taskModel: Model<Task>,
		private readonly stageService: StageService,
	) {}

	async create(createTaskDto: CreateTaskDto) {
		const foundStage = await this.stageService.findById(createTaskDto.stageId)

		if (!foundStage) {
			throw new BadRequestException('Stage not found')
		}

		const createdTask = await this.taskModel.create({
			description: createTaskDto.description,
			title: createTaskDto.title,
		})

		foundStage.tasks[foundStage.tasks.length] = createdTask._id

		await foundStage.save()

		return createdTask
	}

	async update(id: string, updateTaskDto: UpdateTaskDto) {
		return await this.taskModel.updateOne({ _id: id }, updateTaskDto)
	}

	async remove(id: string) {
		return await this.taskModel.deleteOne({ _id: id })
	}
}
