import { BoardService } from '@/board/board.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateStageDto } from './dto/create-stage.dto'
import { UpdateStageDto } from './dto/update-stage.dto'
import { Stage } from './entities/stage.entity'

@Injectable()
export class StageService {
	constructor(
		@InjectModel(Stage.name) private readonly stageModel: Model<Stage>,
		private readonly boardService: BoardService,
	) {}

	async create(createStageDto: CreateStageDto) {
		const foundBoard = await this.boardService.findById(createStageDto.boardId)

		if (!foundBoard) {
			throw new BadRequestException('Board not found')
		}

		const createdStage = await this.stageModel.create({
			name: createStageDto.name,
		})

		foundBoard.stages[foundBoard.stages.length] = createdStage._id

		await foundBoard.save()

		return createdStage
	}

	async update(id: string, updateStageDto: UpdateStageDto) {
		return await this.stageModel.updateOne({ _id: id }, updateStageDto)
	}

	async remove(id: string) {
		return await this.stageModel.deleteOne({ _id: id })
	}
}
