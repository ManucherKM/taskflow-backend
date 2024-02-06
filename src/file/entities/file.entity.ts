import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type FileDocument = HydratedDocument<File>

@Schema({
	timestamps: true,
})
export class File {
	_id: Types.ObjectId

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

	updatedAt: Date

	createdAt: Date

	__v: number
}

export type TFile = File & {
	_id: Types.ObjectId
} & Required<{
		_id: Types.ObjectId
	}>

export const FileSchema = SchemaFactory.createForClass(File)
