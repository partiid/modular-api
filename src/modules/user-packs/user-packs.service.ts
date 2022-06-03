import { Injectable } from '@nestjs/common';
import { CreateUserPackDto } from './dto/create-user-pack.dto';
import { UpdateUserPackDto } from './dto/update-user-pack.dto';

@Injectable()
export class UserPacksService {
    create(createUserPackDto: CreateUserPackDto) {
        return 'This action adds a new userPack';
    }

    getUserPacks() {
        return `This action returns all userPacks`;
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
