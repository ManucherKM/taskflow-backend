import {
	Controller,
	HttpException,
	HttpStatus,
	Post,
	Req,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from './jwt.service'

@Controller('jwt')
export class JwtController {
	constructor(private readonly jwtService: JwtService) {}

	@Post('token')
	async getNewAccessToken(@Req() req: Request) {
		try {
			const refreshToken = req.cookies['refreshToken']

			const { accessToken } = await this.jwtService.getNewAccessToken(
				refreshToken,
			)

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
