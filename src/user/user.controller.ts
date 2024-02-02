import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Patch,
	UseGuards,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
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
			const updatedUser = await this.userService.update(userId, updateUserDto)
			return { success: !!updatedUser.modifiedCount }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async findById(@GetUserIdByToken() userId: string) {
		try {
			const {
				password,
				activationKey,
				isActivated,
				lastOnline,
				__v,
				updatedAt,
				createdAt,
				...other
			} = ((await this.userService.findById(userId)) as any).toObject()
			return other
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
