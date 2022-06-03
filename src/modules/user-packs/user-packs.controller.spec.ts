import { Test, TestingModule } from '@nestjs/testing';
import { UserPacksController } from './user-packs.controller';
import { UserPacksService } from './user-packs.service';

describe('UserPacksController', () => {
    let controller: UserPacksController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserPacksController],
            providers: [UserPacksService],
        }).compile();

        controller = module.get<UserPacksController>(UserPacksController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
