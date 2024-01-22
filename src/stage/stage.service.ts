import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateStageDto } from './dto/create-stage.dto'
import { UpdateStageDto } from './dto/update-stage.dto'
import { Stage } from './entities/stage.entity'

@Injectable()
export class StageService {
	constructor(
		@InjectModel(Stage.name) private readonly stageModel: Model<Stage>,
	) {}

	async create(createStageDto: CreateStageDto) {
		return await this.stageModel.create(createStageDto)
	}

	async update(id: string, updateStageDto: UpdateStageDto) {
		return await this.stageModel.updateOne({ _id: id }, updateStageDto)
	}

	async remove(id: string) {
		return await this.stageModel.deleteOne({ _id: id })
	}
}
