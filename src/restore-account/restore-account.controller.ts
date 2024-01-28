import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { CreateRestoreAccountDto } from './dto/create-restore-account.dto'
import { VerificationOtpDto } from './dto/verification-otp.dto'
import { RestoreAccountService } from './restore-account.service'

@Controller('restore-account')
export class RestoreAccountController {
	constructor(private readonly restoreAccountService: RestoreAccountService) {}

	@Post()
	async createOtp(@Body() createRestoreAccountDto: CreateRestoreAccountDto) {
		try {
			await this.restoreAccountService.createOtp(createRestoreAccountDto)
			return { success: true }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('verification')
	async verificationOtp(@Body() verificationOtpDto: VerificationOtpDto) {
		try {
			const { accessToken } = await this.restoreAccountService.verificationOtp(
				verificationOtpDto,
			)

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
