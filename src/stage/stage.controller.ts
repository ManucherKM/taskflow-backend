import { BoardService } from '@/board/board.service'
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
import { CreateStageDto } from './dto/create-stage.dto'
import { UpdateStageDto } from './dto/update-stage.dto'
import { StageService } from './stage.service'

@Controller('stage')
export class StageController {
	constructor(
		private readonly stageService: StageService,
		private readonly boardService: BoardService,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createStageDto: CreateStageDto) {
		try {
			const foundBoard = await this.boardService.findById(
				createStageDto.boardId,
			)

			if (!foundBoard) {
				throw new BadRequestException('Board not found')
			}

			const createdStage = await this.stageService.create(createStageDto)

			foundBoard.stages[foundBoard.stages.length] = createdStage._id

			await foundBoard.save()

			return createdStage
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateStageDto: UpdateStageDto,
	) {
		try {
			const updateResult = await this.stageService.update(id, updateStageDto)

			if (!updateResult.modifiedCount) {
				throw new BadRequestException('Failed to update the Stage.')
			}

			const foundStage = await this.stageService.getDeepInfo(id)

			if (!foundStage) {
				throw new BadRequestException('Stage not found')
			}

			return foundStage
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('/duplicate')
	async duplicate(@Body() duplicateStageDto: { id: string; boardId: string }) {
		try {
			const foundBoard = await this.boardService.findById(
				duplicateStageDto.boardId,
			)

			if (!foundBoard) {
				throw new BadRequestException('Board not found')
			}

			const duplicatedStage = await this.stageService.duplicate(
				duplicateStageDto.id,
			)

			if (!duplicatedStage) {
				throw new BadRequestException('Failed to duplicate stage.')
			}

			foundBoard.stages[foundBoard.stages.length] = duplicatedStage._id

			await foundBoard.save()

			return duplicatedStage
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const deleteResult = await this.stageService.remove(id)

			return {
				success: !!deleteResult.deletedCount,
			}
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}
}
