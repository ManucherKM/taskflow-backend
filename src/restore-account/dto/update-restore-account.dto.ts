import { PartialType } from '@nestjs/mapped-types'
import { CreateRestoreAccountDto } from './create-restore-account.dto'

export class UpdateRestoreAccountDto extends PartialType(
	CreateRestoreAccountDto,
) {}
