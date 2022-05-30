import { Injectable } from '@nestjs/common';
import { CreatePackDto } from './dto/createPack.dto';
import { UpdatePackDto } from './dto/updatePack.dto';

@Injectable()
export class PacksService {
    create(createPackDto: CreatePackDto) {
        return 'This action adds a new pack';
    }

    getPacks() {
        return `This action returns all packs`;
    }

    getPack(id: number) {
        return `This action returns a #${id} pack`;
    }

    update(id: number, updatePackDto: UpdatePackDto) {
        return `This action updates a #${id} pack`;
    }

    remove(id: number) {
        return `This action removes a #${id} pack`;
    }
}
