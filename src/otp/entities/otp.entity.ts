import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type OtpDocument = HydratedDocument<Otp>

@Schema({
	timestamps: true,
})
export class Otp {
	_id: Types.ObjectId

	@Prop({ required: true, unique: true, type: String })
	email: string

	@Prop({ required: true, unique: true, type: Number })
	otp: number

	updatedAt: Date

	createdAt: Date

	__v: number
}

export const OtpSchema = SchemaFactory.createForClass(Otp)
