import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	InternalServerErrorException,
	Patch,
	UseGuards,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDocument } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Patch()
	async update(
		@GetUserIdByToken() userId: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		try {
			const updateResult = await this.userService.update(userId, updateUserDto)

			if (!updateResult.modifiedCount) {
				throw new BadRequestException('Failed to update User.')
			}

			const foundUser = await this.userService.findById(userId)

			if (!foundUser) {
				throw new BadRequestException('User not found')
			}

			return foundUser
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async findById(@GetUserIdByToken() userId: string) {
		try {
			const foundUser = await this.userService.findById(userId)

			if (!foundUser) {
				throw new BadRequestException('User not found')
			}

			const formatedUser = this.formatUser(foundUser)

			return formatedUser
		} catch (e) {
			console.log(e)
			throw new InternalServerErrorException({ message: e.message })
		}
	}

	async formatUser(user: UserDocument) {
		const {
			password,
			activationKey,
			isActivated,
			updatedAt,
			createdAt,
			__v,
			...other
		} = user.toObject()

		return other
	}
}
