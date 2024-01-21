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

	@Prop({ default: getRandomImg(), type: String })
	avatar: string

	@Prop({ type: String })
	firstName?: string

	@Prop({ type: String })
	lastName?: string

	@Prop({ required: true, type: Number })
	lastOnline: number

	@Prop({ required: true, default: false, type: Boolean })
	isActivated: boolean

	@Prop({ required: true, unique: true, type: String })
	activationKey: string
}

export const UserSchema = SchemaFactory.createForClass(User)
