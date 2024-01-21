import { UserService } from '@/user/user.service'
import { EVariantGetData, getDataByToken } from '@/utils/getDataByToken'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as jwt from 'jsonwebtoken'
import { Model } from 'mongoose'
import { CreateJwtDto } from './dto/create-jwt.dto'
import { Jwt } from './entities/jwt.entity'
import { IDataToken } from './types'

@Injectable()
export class JwtService {
	constructor(
		@InjectModel(Jwt.name) private jwtModel: Model<Jwt>,
		private readonly userService: UserService,
	) {}

	async create(createJwtDto: CreateJwtDto) {
		const refreshToken = await this.generateRefreshToken(createJwtDto)
		const accessToken = this.getAccessToken(createJwtDto)

		return {
			refreshToken,
			accessToken,
		}
	}

	async findByUserId(userId: string) {
		return await this.jwtModel.findOne({ userId })
	}

	async getNewAccessToken(refreshToken: string) {
		const [isValid, dataToken] = await this.validateToken(
			refreshToken,
			'refresh',
		)

		if (!isValid) {
			throw new BadRequestException('Invalid token.')
		}

		return {
			accessToken: this.getAccessToken(dataToken),
		}
	}

	getAccessToken(payload: IDataToken) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: 30 * 60, // 30m
		})
	}

	private getRefreshToken(payload: IDataToken) {
		return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: 30 * 24 * 60 * 60, // 30d
		})
	}

	async generateRefreshToken(payload: IDataToken) {
		const foundToken = await this.jwtModel.findOne({ userId: payload.userId })

		if (foundToken) {
			const token = this.getRefreshToken(payload)

			foundToken.refreshToken = token

			await foundToken.save()

			return token
		}

		const refreshToken = this.getRefreshToken(payload)

		await this.jwtModel.create({
			refreshToken,
			userId: payload.userId,
		})

		return refreshToken
	}

	async validateToken(token: string, variant: `${EVariantGetData}`) {
		const { userId } = getDataByToken(token, variant)

		const foundUser = await this.userService.findById(userId)

		const isUserExist = !!foundUser && foundUser.isActivated

		if (!isUserExist) {
			throw new BadRequestException('Invalid token')
		}

		const dataToken: IDataToken = { userId }

		return [true, dataToken] as [boolean, IDataToken]
	}
}
