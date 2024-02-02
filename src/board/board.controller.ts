import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Delete,
	HttpException,
	HttpStatus,
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
			return await this.boardService.create(userId, createBoardDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('all')
	async findAllByUserId(@GetUserIdByToken() userId: string) {
		try {
			return await this.boardService.findAllByUserId(userId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('name')
	async findByName(
		@GetUserIdByToken() userId: string,
		@Body() { name }: { name: string },
	) {
		try {
			return await this.boardService.findByName(userId, name)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateBoardDto: UpdateBoardDto,
	) {
		try {
			const updatedBoard = await this.boardService.update(id, updateBoardDto)
			return {
				success: !!updatedBoard.modifiedCount,
			}
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const res = await this.boardService.remove(id)
			return {
				success: !!res.deletedCount,
			}
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post(':id')
	async findDeepById(@Body() { id }: { id: string }) {
		try {
			return await this.boardService.findDeepById(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
