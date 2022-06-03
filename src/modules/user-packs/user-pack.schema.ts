import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { PackServerState, PackSetting } from '../packs/pack.schema';

export type UserPackDocument = UserPack & Document;

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
    settings: Array<PackSetting>;

    @ApiProperty()
    @Prop()
    state: PackServerState;
}

export const UserPackSchema = SchemaFactory.createForClass(UserPack);
