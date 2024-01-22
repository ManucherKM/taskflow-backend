import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(Task.name) private readonly taskModel: Model<Task>,
	) {}

	async create(createTaskDto: CreateTaskDto) {
		return await this.taskModel.create(createTaskDto)
	}

	async update(id: string, updateTaskDto: UpdateTaskDto) {
		return await this.taskModel.updateOne({ _id: id }, updateTaskDto)
	}

	async remove(id: string) {
		return await this.taskModel.deleteOne({ _id: id })
	}
}
