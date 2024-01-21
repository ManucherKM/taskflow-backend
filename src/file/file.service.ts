import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import fs from 'fs'
import { Model } from 'mongoose'
import { join } from 'path'
import { File, TFile } from './entities/file.entity'

@Injectable()
export class FileService {
	constructor(
		@InjectModel(File.name) private readonly fileModel: Model<File>,
	) {}

	async create(userId: string, file: Express.Multer.File) {
		const foundFile = await this.findByFileName(file.filename)

		if (foundFile) {
			throw new BadRequestException('Such a file already exists.')
		}

		return await this.fileModel.create({
			fileName: file.filename,
			mimetype: file.mimetype,
			originalName: file.originalname,
			size: file.size,
			userId,
		})
	}

	async findByFileName(fileName: string) {
		return await this.fileModel.findOne({ fileName })
	}

	async findByUserId(userId: string) {
		return await this.fileModel.find({ userId })
	}

	async findById(id: string) {
		return await this.fileModel.findById({ _id: id })
	}

	async getAvatars() {
		const avatars = [] as string[]
		const pathToDir = join('uploads', 'avatar')

		fs.readdir(pathToDir, (err, files) => {
			if (err) {
				console.log(err)
				return
			}

			files.forEach(file => {
				avatars.push(`${process.env.API_URL}/uploads/avatar/${file}`)
			})
		})

		return avatars
	}

	formatFileModel(fileModel: TFile) {
		return {
			id: fileModel._id.toString(),
			fileName: fileModel.fileName,
			originalName: fileModel.originalName,
		}
	}
}
