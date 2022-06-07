import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePackDto } from './dto/createPack.dto';
import { UpdatePackDto } from './dto/updatePack.dto';
import { Pack, PackDocument } from './pack.schema';
import { Model } from 'mongoose';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PacksService {
    constructor(
        @InjectModel('Pack') private readonly PackModel: Model<PackDocument>,
    ) {}
    async create(dto: Pack): Promise<Pack> {
        const newPack = new this.PackModel(dto);
        let pack = null;
        try {
            pack = await newPack.save();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
        if (!newPack) {
            throw new ConflictException('Pack not created');
        }
        return pack;
    }

    async getPacks(): Promise<Pack[]> {
        try {
            return await this.PackModel.find().exec();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
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
