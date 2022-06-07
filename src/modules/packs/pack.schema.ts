import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsIn } from 'class-validator';
import { Document } from 'mongoose';
import shortId = require('shortid');

export type PackDocument = Pack & Document;

/**
 * @description server state defines in which state the module is
 * @example
 * online - the module is online and available for users
 * offline - the module is offline and unavailable for users
 * maintenance - the module is in maintenance mode and unavailable for users
 */
export enum PackServerState {
    ONLINE = 'online',
    OFFLINE = 'offline',
    MAINTENEANCE = 'maintenance',
}
/**
 * @description pack type defines pack usage way
 * @example
 * view - pack that displays data
 * cron - automatic pack for scheduled tasks eg. mailing
 * utility - pack that provides manual funcionality
 */
export enum PackType {
    VIEW = 'view',
    CRON = 'cron',
    UTILITY = 'utility',
}

/**
 * @description pack setting that is standarized for all packs, every pack setting should follow this schema
 */
export interface PackSetting {
    name: string;
    type: string;
    description: string;
    value: any;
    defaultValue: string;
    availableValues?: Array<any>;
}

@Schema()
export class Pack {
    @Exclude()
    @Prop({ default: shortId.generate })
    pack_id: string;

    @Prop({ required: true })
    @ApiProperty()
    name: string;

    @ApiProperty({})
    @Prop({})
    settings: Array<PackSetting>;

    @ApiProperty()
    @IsIn(Object.values(PackServerState))
    @Prop()
    serverState: PackServerState;

    @ApiProperty()
    @IsIn(Object.values(PackType))
    @Prop()
    type: PackType;
}

export const PackSchema = SchemaFactory.createForClass(Pack);
