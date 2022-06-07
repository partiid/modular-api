import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { PackServerState, PackSetting } from '../packs/pack.schema';

export type UserPackDocument = UserPack & Document;

export interface UserPackSetting {
    name: string;
    value: any;
    values?: Array<any>;
}
@Schema()
export class UserPack {
    @Prop()
    userPack_id: string;

    @ApiProperty()
    @Prop({})
    user_id: string;

    @ApiProperty()
    @Prop({})
    pack_id: string;

    @ApiProperty()
    @Prop()
    settings: Array<UserPackSetting>;

    @ApiProperty()
    @Prop()
    state: PackServerState;
}

export const UserPackSchema = SchemaFactory.createForClass(UserPack);
