import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { Board } from './entities/board.entity'

@Injectable()
export class BoardService {
	constructor(
		@InjectModel(Board.name) private readonly boardModel: Model<Board>,
	) {}

	async create(userId: string, createBoardDto: CreateBoardDto) {
		const createdBoard = await this.boardModel.create({
			name: createBoardDto.name,
			admins: [userId],
			users: [userId],
		})

		return createdBoard
	}

	async findAllByUserId(userId: string) {
		const foundBoards = await this.boardModel.find({
			users: userId,
		})

		return foundBoards
	}

	async findById(id: string) {
		const foundBoard = await this.boardModel.findById(id)

		return foundBoard
	}

	async findDeepById(id: string) {
		const foundBoard = await this.findById(id)

		const deepFound = await foundBoard.populate({
			path: 'stages',
			populate: {
				path: 'tasks',
			},
		})

		return deepFound
	}

	async findByStageId(stageId: string) {
		const foundBoard = await this.boardModel.findOne({ stages: stageId })

		return foundBoard
	}

	async findByName(userId: string, name: string) {
		const foundBoard = await this.boardModel.find({
			users: userId,
			name: new RegExp(name),
		})

		return foundBoard
	}

	async update(id: string, updateBoardDto: UpdateBoardDto) {
		const updateResult = await this.boardModel.updateOne(
			{ _id: id },
			updateBoardDto,
		)

		return updateResult
	}

	async remove(id: string) {
		const removeResult = await this.boardModel.deleteOne({ _id: id })

		return removeResult
	}
}
