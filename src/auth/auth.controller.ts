import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('registration')
	async registration(@Body() registrationDto: RegistrationDto) {
		try {
			return await this.authService.registration(registrationDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('login')
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		try {
			const { accessToken, refreshToken } = await this.authService.login(
				loginDto,
			)

			res.cookie('refreshToken', refreshToken, { httpOnly: true })

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		try {
			res.clearCookie('refreshToken')
			return { success: true }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('username')
	async checkUserName(@Body() { userName }: { userName: string }) {
		try {
			const isExist = await this.authService.checkUserName(userName)
			return { exist: isExist }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
