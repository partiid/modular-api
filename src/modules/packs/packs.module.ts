import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';
import { PackSchema } from './pack.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    controllers: [PacksController],
    providers: [PacksService],
    imports: [
        MongooseModule.forFeature([{ name: 'Pack', schema: PackSchema }]),
    ],
})
export class PacksModule {}
