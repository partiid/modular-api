import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { BaseExceptionFilter } from '@nestjs/core';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}
    async getUsers(): Promise<User[]> {
        return await this.UserModel.find().exec();
    }

    async createUser(user: User): Promise<User> {
        const newUser = new this.UserModel(user);
        try {
            user = await newUser.save();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
        if (!newUser) {
            throw new ConflictException('User not created');
        }
        return user;
    }
}
