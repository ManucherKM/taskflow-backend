import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStageDto {
	@IsString()
	@IsNotEmpty()
	name: string
}
