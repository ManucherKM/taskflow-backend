import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TaskDocument = HydratedDocument<Task>

@Schema({
	timestamps: true,
})
export class Task {
	@Prop({ required: true, type: String })
	title: string

	@Prop({ required: true, type: String })
	description: string

	@Prop({ type: Date })
	updatedAt: Date

	@Prop({ type: Date })
	createdAt: Date

	@Prop({ type: Number })
	__v: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
