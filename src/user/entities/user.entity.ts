import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({
	timestamps: true,
})
export class User {
	@Prop({ required: true, unique: true, type: String })
	email: string

	@Prop({ required: true, unique: true, type: String })
	userName: string

	@Prop({ required: true, type: String })
	password: string

	@Prop({ type: String })
	avatar?: string

	@Prop({ type: String })
	firstName?: string

	@Prop({ type: String })
	lastName?: string

	@Prop({ type: String })
	bio?: string

	@Prop({ type: String })
	birthday?: string

	@Prop({ type: [{ value: String }] })
	urls?: { value: string }[]

	@Prop({ default: false, type: Boolean })
	isActivated: boolean

	@Prop({ required: true, unique: true, type: String })
	activationKey: string

	@Prop({ type: Date })
	updatedAt: Date

	@Prop({ type: Date })
	createdAt: Date

	@Prop({ type: Number })
	__v: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
