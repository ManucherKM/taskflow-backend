import { Stage, StageDocument } from '@/stage/entities/stage.entity'
import { User } from '@/user/entities/user.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Model, SchemaTypes, Types } from 'mongoose'

export type BoardDocument = HydratedDocument<Board>

@Schema({
	timestamps: true,
})
export class Board {
	@Prop({ required: true, type: String })
	name: string

	@Prop({ type: Boolean, default: false })
	isFavorite: boolean

	@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Stage' }], default: [] })
	stages: StageDocument[]

	@Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
	admins: string[]

	@Prop({ required: true, type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
	users: string[]
}

export const BoardSchema = SchemaFactory.createForClass(Board)
