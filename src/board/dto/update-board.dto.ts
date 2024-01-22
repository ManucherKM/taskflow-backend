import { PartialType } from '@nestjs/mapped-types'
import { ArrayMinSize, IsArray, IsString } from 'class-validator'
import { CreateBoardDto } from './create-board.dto'

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(1)
	stages?: string[]
}
