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
import { UserPack } from './user-pack.schema';

@Controller('/users/packs/')
export class UserPacksController {
    constructor(private readonly userPacksService: UserPacksService) {}

    /**
     * @description - this method will assign pack to the user in the UserPacks collection
     * so the then we can select from this collection and download settings
     * @param dto - this is the pack that we want to assign to the user
     *
     */
    @Post()
    assignPackToTheUser(@Body() dto: UserPack) {
        return this.userPacksService.create(dto);
    }

    // @Get(':id')
    // getUserPacks(@Param('id') id: string) {
    //     return this.userPacksService.getUserPacks(id);
    // }

    // @Get(':id')
    // getUserPack(@Param('id') id: string) {
    //     return this.userPacksService.getUserPack(+id);
    // }

    // @Put(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateUserPackDto: UpdateUserPackDto,
    // ) {
    //     return this.userPacksService.update(+id, updateUserPackDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userPacksService.remove(+id);
    // }
}
