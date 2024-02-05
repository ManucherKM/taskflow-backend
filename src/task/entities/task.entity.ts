import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude, Transform } from 'class-transformer'
import { HydratedDocument, Types } from 'mongoose'

export type TaskDocument = HydratedDocument<Task>

@Schema({
	timestamps: true,
})
export class Task {
	@Transform(({ value }) => value.toString())
	_id: Types.ObjectId

	@Prop({ required: true, type: String })
	title: string

	@Prop({ required: true, type: String })
	description: string

	@Exclude()
	updatedAt: Date

	@Exclude()
	createdAt: Date

	@Exclude()
	__v: number
}

export const TaskSchema = SchemaFactory.createForClass(Task)
