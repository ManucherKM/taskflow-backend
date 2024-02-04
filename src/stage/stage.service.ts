import { BoardService } from '@/board/board.service'
import { TaskDocument } from '@/task/entities/task.entity'
import { TaskService } from '@/task/task.service'
import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateStageDto } from './dto/create-stage.dto'
import { UpdateStageDto } from './dto/update-stage.dto'
import { Stage } from './entities/stage.entity'

@Injectable()
export class StageService {
	constructor(
		@InjectModel(Stage.name) private readonly stageModel: Model<Stage>,
		private readonly boardService: BoardService,
		@Inject(forwardRef(() => TaskService))
		private readonly taskService: TaskService,
	) {}

	async create(createStageDto: CreateStageDto) {
		const foundBoard = await this.boardService.findById(createStageDto.boardId)

		if (!foundBoard) {
			throw new BadRequestException('Board not found')
		}

		const createdStage = await this.stageModel.create({
			name: createStageDto.name,
			tasks: createStageDto.tasks,
		})

		foundBoard.stages[foundBoard.stages.length] = createdStage._id

		await foundBoard.save()

		return createdStage
	}

	async findById(id) {
		return await this.stageModel.findById(id)
	}

	async update(id: string, updateStageDto: UpdateStageDto) {
		const updatedStage = await await this.stageModel.updateOne(
			{ _id: id },
			updateStageDto,
		)

		const foundStage = await this.getDeepInfo(id)
		return foundStage
	}

	async remove(id: string) {
		return await this.stageModel.deleteOne({ _id: id })
	}

	async getDeepInfo(id: string | Types.ObjectId) {
		const foundStage = await this.findById(id)

		if (!foundStage) {
			throw new BadRequestException('Stage not found')
		}

		return await foundStage.populate('tasks')
	}

	async findByTaskId(taskId) {
		return await this.stageModel.findOne({ tasks: taskId })
	}

	async addTasks(
		stageId: string | Types.ObjectId,
		taskIds: string[] | Types.ObjectId[],
	) {
		const foundStage = await this.findById(stageId)

		if (!foundStage) {
			throw new BadRequestException('Stage not found')
		}

		for (const id of taskIds) {
			;(foundStage.tasks as unknown as string[])[foundStage.tasks.length] =
				id as string
		}

		await foundStage.save()

		return
	}

	async duplicate(id: string) {
		const foundStage = await this.findById(id)

		if (!foundStage) {
			throw new BadRequestException('Stage not found')
		}

		const foundBoard = await this.boardService.findByStageId(id)

		if (!foundBoard) {
			throw new BadRequestException('Board not found')
		}

		const createdStage = await this.create({
			boardId: foundBoard._id as unknown as string,
			name: foundStage.name,
		})

		const promiseTasks: Promise<TaskDocument>[] = []

		for (const task of foundStage.tasks) {
			promiseTasks[promiseTasks.length] = this.taskService.duplicate(task._id)
		}

		const createdTasks = await Promise.all(promiseTasks)

		const taskIds = createdTasks.map(task => task._id)

		await this.addTasks(createdStage._id, taskIds)

		return await this.getDeepInfo(createdStage._id)
	}
}
