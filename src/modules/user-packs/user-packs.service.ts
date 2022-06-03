import { Injectable } from '@nestjs/common';
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
    create(createUserPackDto: CreateUserPackDto) {
        return 'This action adds a new userPack';
    }

    async getUserPacks(): Promise<UserPack[]> {
        return await this.UserPackSchema.find().exec();
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
