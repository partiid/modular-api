import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
    Logger,
    UseFilters,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}
    async getUsers(): Promise<User[]> {
        return await this.UserModel.find().exec();
    }

    async getByUsername(username: string): Promise<User> {
        this.logger.log(`Getting user by username: ${username}`);
        let userFound = null;
        try {
            userFound = await this.UserModel.findOne({
                username: username,
            });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
        if (!userFound) {
            throw new NotFoundException('User not found');
        }
        return userFound;
    }

    async create(user: User): Promise<User> {
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
    /**
     *
     * @param _id - user id
     * @param refreshToken - Newly generated refresh token
     * @returns User
     */
    async setRefreshToken(_id: any, refreshToken: string): Promise<User> {
        let userFound = null;

        try {
            userFound = await this.UserModel.findOneAndUpdate(
                { user_id: _id },
                { refreshToken: refreshToken },
                { new: true },
            );
            console.log(userFound);
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException(err);
        }
        if (!userFound) {
            throw new NotFoundException('User not found');
        }
        return userFound;
    }
}
