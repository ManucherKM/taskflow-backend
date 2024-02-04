import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	BadRequestException,
	Controller,
	Get,
	InternalServerErrorException,
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
			const foundFile = await this.fileService.findByFileName(file.filename)

			if (!!foundFile) {
				throw new BadRequestException('Such a file already exists.')
			}

			const createdFile = await this.fileService.create(userId, file)

			if (!createdFile) {
				throw new BadRequestException('Failed to create file.')
			}

			const formatedFile = this.fileService.formatFileModel(createdFile)

			return formatedFile
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('userId')
	async findByUserId(@GetUserIdByToken() userId: string) {
		try {
			const foundFiles = await this.fileService.findByUserId(userId)

			if (!Array.isArray(foundFiles)) {
				throw new BadRequestException('Files not found')
			}

			const formatedFiles = this.fileService.formatMultipleFiles(foundFiles)

			return formatedFiles
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}
}
