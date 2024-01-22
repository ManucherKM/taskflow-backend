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

	async findAllByUserId(userId: string, deep: boolean) {
		const foundBoards = await this.boardModel.find({
			users: userId,
		})

		if (!deep) {
			return foundBoards
		}

		const deepFound = await Promise.all(
			foundBoards.map(async board => {
				return board.populate({
					path: 'stages',
					populate: {
						path: 'tasks',
					},
				})
			}),
		)

		return deepFound
	}

	async update(id: string, updateBoardDto: UpdateBoardDto) {
		return await this.boardModel.updateOne({ _id: id }, updateBoardDto)
	}

	async remove(id: string) {
		return await this.boardModel.deleteOne({ _id: id })
	}
}
