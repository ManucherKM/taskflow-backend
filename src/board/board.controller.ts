import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Delete,
	Get,
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
	async findAllByUserId(
		@GetUserIdByToken() userId: string,
		@Body() { deep }: { deep: boolean },
	) {
		try {
			return await this.boardService.findAllByUserId(userId, deep)
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
}
