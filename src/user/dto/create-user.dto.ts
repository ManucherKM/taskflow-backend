import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	userName: string

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string

	@IsString()
	avatar?: string

	@IsString()
	firstName?: string

	@IsString()
	lastName?: string

	@IsNumber()
	lastOnline?: number

	@IsBoolean()
	isActivated?: boolean

	@IsString()
	@IsNotEmpty()
	activationKey: string
}
