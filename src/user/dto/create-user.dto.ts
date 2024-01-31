import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
	ValidateNested,
} from 'class-validator'

class Url {
	@IsString()
	@IsNotEmpty()
	value: string
}

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
	activationKey?: string

	@IsOptional()
	@IsString()
	bio?: string

	@IsOptional()
	@IsString()
	birthday?: string

	@IsOptional()
	@IsString()
	language?: string

	@IsOptional()
	@IsString()
	mode?: string

	@IsOptional()
	@IsString()
	font?: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Url)
	urls?: { value: string }[]
}
