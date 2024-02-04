import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateStageDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	boardId: string

	@IsOptional()
	@IsString()
	tasks?: string[]
}
