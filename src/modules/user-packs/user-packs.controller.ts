import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { UserPacksService } from './user-packs.service';
import { CreateUserPackDto } from './dto/create-user-pack.dto';
import { UpdateUserPackDto } from './dto/update-user-pack.dto';

@Controller('/userPacks')
export class UserPacksController {
    constructor(private readonly userPacksService: UserPacksService) {}

    @Post()
    create(@Body() createUserPackDto: CreateUserPackDto) {
        return this.userPacksService.create(createUserPackDto);
    }

    @Get(':id')
    getUserPacks(@Param('id') id: string) {
        return this.userPacksService.getUserPacks(id);
    }

    @Get(':id')
    getUserPack(@Param('id') id: string) {
        return this.userPacksService.getUserPack(+id);
    }

    @Put(':id')
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
