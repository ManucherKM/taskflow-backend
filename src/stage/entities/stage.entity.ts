import { TaskDocument } from '@/task/entities/task.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type StageDocument = HydratedDocument<Stage>

@Schema({
	timestamps: true,
})
export class Stage {
	_id: Types.ObjectId

	@Prop({ required: true, type: String })
	name: string

	@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Task' }], default: [] })
	tasks: TaskDocument[] | Types.ObjectId[]

	updatedAt: Date

	createdAt: Date

	__v: number
}

export const StageSchema = SchemaFactory.createForClass(Stage)
