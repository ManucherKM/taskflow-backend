import { StageDocument } from '@/stage/entities/stage.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude, Transform } from 'class-transformer'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type BoardDocument = HydratedDocument<Board>

@Schema({
	timestamps: true,
})
export class Board {
	@Transform(({ value }) => value.toString())
	_id: Types.ObjectId

	@Prop({ required: true, type: String })
	name: string

	@Prop({ type: Boolean, default: false })
	isFavorite: boolean

	@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Stage' }], default: [] })
	stages: StageDocument[] | Types.ObjectId[]

	@Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
	admins: string[]

	@Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
	users: string[]

	@Exclude()
	updatedAt: Date

	@Exclude()
	createdAt: Date

	@Exclude()
	__v: number
}

export const BoardSchema = SchemaFactory.createForClass(Board)
