import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
    @ApiProperty()
    @Prop({ required: true })
    username: string;
    @ApiProperty()
    @Prop({ required: true })
    password: string;
    @ApiProperty()
    @Prop({ required: true })
    email: string;
    @ApiProperty()
    @Prop({ required: true })
    firstName: string;
    @ApiProperty()
    @Prop({ required: true })
    lastName: string;
    @ApiProperty()
    @Prop({ required: true })
    role: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
