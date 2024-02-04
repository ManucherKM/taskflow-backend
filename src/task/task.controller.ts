import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { StageService } from '@/stage/stage.service'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	forwardRef,
	Inject,
	InternalServerErrorException,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskService } from './task.service'

@Controller('task')
export class TaskController {
	constructor(
		private readonly taskService: TaskService,
		@Inject(forwardRef(() => StageService))
		private readonly stageService: StageService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createTaskDto: CreateTaskDto) {
		try {
			const foundStage = await this.stageService.findById(createTaskDto.stageId)

			if (!foundStage) {
				throw new BadRequestException('Stage not found')
			}

			const createdTask = await this.taskService.create(createTaskDto)

			if (!createdTask) {
				throw new BadRequestException('Failed to create task.')
			}

			foundStage.tasks[foundStage.tasks.length] = createdTask._id

			await foundStage.save()

			return createdTask
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		try {
			const updateResult = await this.taskService.update(id, updateTaskDto)

			if (!updateResult.modifiedCount) {
				throw new BadRequestException('Failed to update task.')
			}

			const foundTask = await this.taskService.findById(id)

			if (!foundTask) {
				throw new BadRequestException('Task not found')
			}

			return foundTask
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('/duplicate')
	async duplicate(@Body() duplicateTaskDto: { id: string; stageId: string }) {
		try {
			const { id, stageId } = duplicateTaskDto

			const foundTask = await this.taskService.findById(id)

			if (!foundTask) {
				throw new BadRequestException('Task not found')
			}

			const createdTask = await this.taskService.duplicate(id)

			await this.stageService.addTasks(stageId, [createdTask._id])

			return createdTask
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const deleteResult = await this.taskService.remove(id)

			return {
				success: !!deleteResult.deletedCount,
			}
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}
}
