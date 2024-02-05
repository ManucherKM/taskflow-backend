import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type FileDocument = HydratedDocument<File>

@Schema({
	timestamps: true,
})
export class File {
	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
	userId: Types.ObjectId

	@Prop({ required: true, unique: true, type: String })
	fileName: string

	@Prop({ required: true, type: String })
	originalName: string

	@Prop({ required: true, type: Number })
	size: number

	@Prop({ required: true, type: String })
	mimetype: string

	@Prop({ type: Date })
	updatedAt: Date

	@Prop({ type: Date })
	createdAt: Date

	@Prop({ type: Number })
	__v: Date
}

export type TFile = File & {
	_id: Types.ObjectId
} & Required<{
		_id: Types.ObjectId
	}>

export const FileSchema = SchemaFactory.createForClass(File)
