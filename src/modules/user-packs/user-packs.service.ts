import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserPackDto } from './dto/create-user-pack.dto';
import { UpdateUserPackDto } from './dto/update-user-pack.dto';
import { Model } from 'mongoose';
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
        try {
            userPack = await this.UserPackSchema.create(dto);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
        if (!userPack) {
            throw new ConflictException('UserPack not created');
        }
        return userPack;
    }

    async getUserPacks(id: string): Promise<UserPack[]> {
        return await this.UserPackSchema.find({
            user_id: id,
        }).exec();
    }

    getUserPack(id: number) {
        return `This action returns a #${id} userPack`;
    }

    update(id: number, updateUserPackDto: UpdateUserPackDto) {
        return `This action updates a #${id} userPack`;
    }

    remove(id: number) {
        return `This action removes a #${id} userPack`;
    }
}
