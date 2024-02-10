import { StageDocument } from '@/stage/entities/stage.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type BoardDocument = HydratedDocument<Board>

@Schema({
	timestamps: true,
})
export class Board {
	_id: Types.ObjectId

	@Prop({ required: true, type: String })
	name: string

	@Prop({ type: Boolean, default: false })
	isFavorite: boolean

	@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Stage' }], default: [] })
	stages: StageDocument[] | Types.ObjectId[]

	@Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
	admins: Types.ObjectId[]

	@Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
	users: string[]

	updatedAt: Date

	createdAt: Date

	__v: number
}

export const BoardSchema = SchemaFactory.createForClass(Board)
