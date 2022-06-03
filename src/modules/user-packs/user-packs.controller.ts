import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UserPacksService } from './user-packs.service';
import { CreateUserPackDto } from './dto/create-user-pack.dto';
import { UpdateUserPackDto } from './dto/update-user-pack.dto';

@Controller('user-packs')
export class UserPacksController {
    constructor(private readonly userPacksService: UserPacksService) {}

    @Post()
    create(@Body() createUserPackDto: CreateUserPackDto) {
        return this.userPacksService.create(createUserPackDto);
    }

    @Get()
    getUserPacks() {
        return this.userPacksService.getUserPacks();
    }

    @Get(':id')
    getUserPack(@Param('id') id: string) {
        return this.userPacksService.getUserPack(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserPackDto: UpdateUserPackDto,
    ) {
        return this.userPacksService.update(+id, updateUserPackDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userPacksService.remove(+id);
    }
}
