import { Module } from '@nestjs/common';
import { UserPacksService } from './user-packs.service';
import { UserPacksController } from './user-packs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPackSchema } from './user-pack.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'UserPack', schema: UserPackSchema },
        ]),
    ],

    controllers: [UserPacksController],
    providers: [UserPacksService],
    exports: [UserPacksService],
})
export class UserPacksModule {}
