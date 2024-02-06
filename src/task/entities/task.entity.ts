import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type TaskDocument = HydratedDocument<Task>

@Schema({
	timestamps: true,
})
export class Task {
	_id: Types.ObjectId

	@Prop({ required: true, type: String })
	title: string

	@Prop({ required: true, type: String })
	description: string

	updatedAt: Date

	createdAt: Date

	__v: number
}

export const TaskSchema = SchemaFactory.createForClass(Task)
