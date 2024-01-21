import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { fileStorage } from './storage'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@UseGuards(JwtAuthGuard)
	@UseInterceptors(
		FileInterceptor('file', {
			storage: fileStorage,
		}),
	)
	@Post()
	async create(
		@UploadedFile() file: Express.Multer.File,
		@GetUserIdByToken() userId: string,
	) {
		try {
			const createdFile = await this.fileService.create(userId, file)
			const formatedFile = this.fileService.formatFileModel(createdFile)
			return formatedFile
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('userId')
	async findByUserId(@GetUserIdByToken() userId: string) {
		try {
			const foundFiles = await this.fileService.findByUserId(userId)
			const formatedFiles = foundFiles.map(file =>
				this.fileService.formatFileModel(file.toObject()),
			)
			return formatedFiles
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('avatars')
	async getAvatars() {
		try {
			return await this.fileService.getAvatars()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
