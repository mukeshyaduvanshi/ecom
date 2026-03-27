import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // createdAt, updatedAt auto add hoga
export class User {
  
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true }) // duplicate email nahi hoga
  email!: string;

  @Prop({ required: true }) // hash password store hoga
  password!: string;

  @Prop({ default: 'user' }) // default role user hoga
  role!: string; // 'user' ya 'admin'
}

export const UserSchema = SchemaFactory.createForClass(User)
