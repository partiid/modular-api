
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IsIn, Matches, MaxLength, MinLength } from 'class-validator';
import shortid = require('shortid');
import * as dayjs from 'dayjs';


export type UserDocument = User & Document;

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Schema()
export class User {
    @Prop({ default: shortid.generate })
    user_id: string;

    @ApiProperty()
    @MinLength(4)
    @MaxLength(20)
    @Prop({ required: true, unique: true })
    username: string;

    @ApiProperty()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message:
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
        },
    )
    @Prop({ required: true })
    password: string;

    @ApiProperty()
    @Matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        { message: 'Email is not valid' },
    )
    @Prop({ required: true })
    email: string;

    @ApiProperty()
    @Prop({ required: true })
    firstName: string;

    @ApiProperty()
    @Prop({ required: true })
    lastName: string;

    @ApiProperty()
    @IsIn(Object.values(UserRole))
    @Prop({ required: true })
    role: UserRole;

    @Prop({ default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') })
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
