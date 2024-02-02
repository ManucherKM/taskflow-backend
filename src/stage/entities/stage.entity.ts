import { TaskDocument } from '@/task/entities/task.entity'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type StageDocument = HydratedDocument<Stage>

@Schema({
	timestamps: true,
})
export class Stage {
	@Prop({ required: true, type: String })
	name: string

	@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Task' }], default: [] })
	tasks: TaskDocument[]
}

export const StageSchema = SchemaFactory.createForClass(Stage)
