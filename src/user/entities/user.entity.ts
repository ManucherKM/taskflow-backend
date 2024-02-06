import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import { HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({
	timestamps: true,
})
export class User {
	_id: Types.ObjectId

	@Prop({ required: true, unique: true, type: String })
	email: string

	@Prop({ required: true, unique: true, type: String })
	userName: string

	@Prop({ required: true, type: String })
	@Exclude()
	password: string

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
	@Exclude()
	isActivated: boolean

	@Prop({ required: true, unique: true, type: String })
	@Exclude()
	activationKey: string

	@Exclude()
	updatedAt: Date

	@Exclude()
	createdAt: Date

	@Exclude()
	__v: number
}

export const UserSchema = SchemaFactory.createForClass(User)
