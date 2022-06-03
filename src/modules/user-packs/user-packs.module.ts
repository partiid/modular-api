import { Module } from '@nestjs/common';
import { UserPacksService } from './user-packs.service';
import { UserPacksController } from './user-packs.controller';

@Module({
    controllers: [UserPacksController],
    providers: [UserPacksService],
})
export class UserPacksModule {}
