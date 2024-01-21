import { IsEmail, IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)

export class RegistrationDto {
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	userName: string

	@Matches(passwordRegex)
	password: string

	@IsUrl()
	avatar?: string

	@IsString()
	firstName?: string

	@IsString()
	lastName?: string
}
