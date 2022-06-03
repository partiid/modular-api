import { Test, TestingModule } from '@nestjs/testing';
import { UserPacksService } from './user-packs.service';

describe('UserPacksService', () => {
    let service: UserPacksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserPacksService],
        }).compile();

        service = module.get<UserPacksService>(UserPacksService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
