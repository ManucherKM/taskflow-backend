import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsString,
	Matches,
} from 'class-validator'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{832}$)',
)

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	userName: string

	@Matches(passwordRegex)
	password: string

	@IsString()
	avatar?: string

	@IsString()
	firstName?: string

	@IsString()
	lastName?: string

	@IsNumber()
	lastOnline: number

	@IsBoolean()
	isActivated: boolean

	@IsString()
	@IsNotEmpty()
	activationKey: string
}
