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
		return await this.boardModel.find({
			users: userId,
		})
	}

	async findById(id: string) {
		return await this.boardModel.findById(id)
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

	async findByName(userId: string, name: string) {
		return await this.boardModel.find({
			users: userId,
			name: new RegExp(name),
		})
	}

	async update(id: string, updateBoardDto: UpdateBoardDto) {
		return await this.boardModel.updateOne({ _id: id }, updateBoardDto)
	}

	async remove(id: string) {
		return await this.boardModel.deleteOne({ _id: id })
	}
}
