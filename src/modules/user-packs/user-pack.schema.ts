import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';
import { PackServerState, PackSetting } from '../packs/pack.schema';

export type UserPackDocument = UserPack & Document;

export class UserPackSetting {
    constructor(partial: Partial<UserPackSetting>) {
        Object.assign(this, partial);
    }

    name: string;
    value: any;
    values?: Array<any>;
}
@Schema()
export class UserPack {
    @Prop()
    userPack_id: string;

    @ApiProperty()
    @Prop({ required: true })
    user_id: string;

    @ApiProperty()
    @Prop({ required: true })
    pack_id: string;

    @ApiProperty()
    @Prop()
    @Transform((value) => {
        return new UserPackSetting(value);
    })
    settings: Array<UserPackSetting>;

    @ApiProperty()
    @Prop()
    state: PackServerState;
}

export const UserPackSchema = SchemaFactory.createForClass(UserPack);
