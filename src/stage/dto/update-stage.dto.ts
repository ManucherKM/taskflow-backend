import { PartialType } from '@nestjs/mapped-types'
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { CreateStageDto } from './create-stage.dto'

export class UpdateStageDto extends PartialType(CreateStageDto) {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	tasks?: string[]
}
