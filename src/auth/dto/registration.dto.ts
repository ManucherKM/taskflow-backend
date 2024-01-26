import {
	IsDefined,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator'

export class RegistrationDto {
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	userName: string

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string

	@IsOptional()
	@IsString()
	avatar?: string

	@IsString()
	firstName?: string

	@IsString()
	lastName?: string
}