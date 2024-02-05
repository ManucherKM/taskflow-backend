import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type OtpDocument = HydratedDocument<Otp>

@Schema({
	timestamps: true,
})
export class Otp {
	@Prop({ required: true, unique: true, type: String })
	email: string

	@Prop({ required: true, unique: true, type: Number })
	otp: number

	@Prop({ type: Date })
	updatedAt: Date

	@Prop({ type: Date })
	createdAt: Date

	@Prop({ type: Number })
	__v: Date
}

export const OtpSchema = SchemaFactory.createForClass(Otp)
