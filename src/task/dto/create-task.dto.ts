import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsString()
	@IsNotEmpty()
	stageId: string
}
