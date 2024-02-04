import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { StageService } from '@/stage/stage.service'
import {
	Body,
	Controller,
	Delete,
	forwardRef,
	HttpException,
	HttpStatus,
	Inject,
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
			return await this.taskService.create(createTaskDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		try {
			return await this.taskService.update(id, updateTaskDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('/duplicate')
	async duplicate(@Body() duplicateTaskDto: { id: string; stageId: string }) {
		try {
			const createdTask = await this.taskService.duplicate(duplicateTaskDto.id)

			await this.stageService.addTasks(duplicateTaskDto.stageId, [
				createdTask._id,
			])

			return createdTask
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const res = await this.taskService.remove(id)
			return {
				success: !!res.deletedCount,
			}
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
