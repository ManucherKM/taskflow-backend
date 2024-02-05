import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude, Transform } from 'class-transformer'
import { HydratedDocument, Types } from 'mongoose'

export type OtpDocument = HydratedDocument<Otp>

@Schema({
	timestamps: true,
})
export class Otp {
	@Transform(({ value }) => value.toString())
	_id: Types.ObjectId

	@Prop({ required: true, unique: true, type: String })
	email: string

	@Prop({ required: true, unique: true, type: Number })
	otp: number

	@Exclude()
	updatedAt: Date

	@Exclude()
	createdAt: Date

	@Exclude()
	__v: number
}

export const OtpSchema = SchemaFactory.createForClass(Otp)
