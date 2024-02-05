import { TaskDocument } from '@/task/entities/task.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude, Transform } from 'class-transformer'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type StageDocument = HydratedDocument<Stage>

@Schema({
	timestamps: true,
})
export class Stage {
	@Transform(({ value }) => value.toString())
	_id: Types.ObjectId

	@Prop({ required: true, type: String })
	name: string

	@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Task' }], default: [] })
	tasks: TaskDocument[] | Types.ObjectId[]

	@Exclude()
	updatedAt: Date

	@Exclude()
	createdAt: Date

	@Exclude()
	__v: number
}

export const StageSchema = SchemaFactory.createForClass(Stage)
