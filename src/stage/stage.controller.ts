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
import { CreateStageDto } from './dto/create-stage.dto'
import { UpdateStageDto } from './dto/update-stage.dto'
import { StageService } from './stage.service'

@Controller('stage')
export class StageController {
	constructor(private readonly stageService: StageService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createStageDto: CreateStageDto) {
		try {
			return await this.stageService.create(createStageDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateStageDto: UpdateStageDto,
	) {
		try {
			const res = await this.stageService.update(id, updateStageDto)

			return {
				success: !!res.modifiedCount,
			}
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('/duplicate')
	async duplicate(@Body() duplicateStageDto: { id: string }) {
		try {
			return await this.stageService.duplicate(duplicateStageDto.id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const res = await this.stageService.remove(id)

			return {
				success: !!res.deletedCount,
			}
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
