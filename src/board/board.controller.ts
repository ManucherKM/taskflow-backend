import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	InternalServerErrorException,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'

@Controller('board')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@GetUserIdByToken() userId: string,
		@Body() createBoardDto: CreateBoardDto,
	) {
		try {
			const createdBoard = await this.boardService.create(
				userId,
				createBoardDto,
			)

			if (!createdBoard) {
				throw new BadRequestException('Failed to create Board.')
			}

			return createdBoard
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post(':id')
	async findDeepById(@Body() { id }: { id: string }) {
		try {
			const foundBoard = await this.boardService.findDeepById(id)

			return foundBoard
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('name')
	async findByName(
		@GetUserIdByToken() userId: string,
		@Body() { name }: { name: string },
	) {
		try {
			const foundBoard = await this.boardService.findByName(userId, name)

			if (!foundBoard) {
				throw new BadRequestException('Board not found')
			}

			return foundBoard
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('all')
	async findAllByUserId(@GetUserIdByToken() userId: string) {
		try {
			const foundBoards = await this.boardService.findAllByUserId(userId)

			if (!Array.isArray(foundBoards)) {
				throw new BadRequestException('Boards not found')
			}

			return foundBoards
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateBoardDto: UpdateBoardDto,
	) {
		try {
			const updateResult = await this.boardService.update(id, updateBoardDto)

			if (!!updateResult.modifiedCount) {
				throw new Error('Failed to update board')
			}

			const foundBoard = await this.boardService.findById(id)

			if (!foundBoard) {
				throw new Error('Board not found')
			}

			return foundBoard
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const deleteResult = await this.boardService.remove(id)

			return {
				success: !!deleteResult,
			}
		} catch (e) {
			throw new InternalServerErrorException({ message: e.message })
		}
	}
}
