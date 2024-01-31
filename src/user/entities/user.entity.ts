import { getRandomImg } from '@/utils/getRandomImg'
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

	@Prop({ type: String, default: 'ru' })
	language: string

	@Prop({ type: String, default: 'dark' })
	mode: string

	@Prop({ type: String, default: 'sans' })
	font: string

	@Prop({ type: [{ value: String }] })
	urls?: { value: string }[]

	@Prop({ type: Number })
	lastOnline?: number

	@Prop({ default: false, type: Boolean })
	isActivated: boolean

	@Prop({ required: true, unique: true, type: String })
	activationKey: string
}

export const UserSchema = SchemaFactory.createForClass(User)
