import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { RemoveUserPackDto } from './dto/remove-user-pack.dto';
import { UserPackSchema, UserPackDocument, UserPack } from './user-pack.schema';
@Injectable()
export class UserPacksService {
    constructor(
        @InjectModel('UserPack')
        private UserPackSchema: Model<UserPackDocument>,
    ) {}
    /**
     *
     * @description this method will add userPack object to the collection
     * @returns userPack
     */
    async create(dto: UserPack): Promise<UserPack> {
        let userPack = null;
        let userPackExists = null;
        try {
            userPackExists = await this.UserPackSchema.findOne({
                pack_id: dto.pack_id,
                user_id: dto.user_id,
            }).exec();
            //check if user pack is already assigned
        } catch (err) {
            throw new InternalServerErrorException(err);
        } finally {
            try {
                if (!userPackExists) {
                    userPack = await this.UserPackSchema.create(dto);
                } else {
                    throw new ConflictException('User pack already exists');
                }
            } catch (err) {
                throw new InternalServerErrorException(err);
            }

            if (!userPack) {
                throw new ConflictException('UserPack not created');
            }
        }

        return userPack;
    }

    async getUserPacks(id: string): Promise<UserPack[]> {
        return await this.UserPackSchema.find({
            user_id: id,
        }).exec();
    }

    /**get user pack settings */
    async getUserPackSettings(id: string): Promise<UserPack> {
        return await this.UserPackSchema.findOne({
            pack_id: id,
        }).exec();
    }

    update(id: number) {
        return `This action updates a #${id} userPack`;
    }

    async remove(dto: RemoveUserPackDto): Promise<unknown> {
        const { user_id, pack_id } = dto;
        const result = await this.UserPackSchema.deleteOne({
            pack_id,
            user_id,
        }).exec();

        return result;
    }
}
