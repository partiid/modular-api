import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { PacksService } from './packs.service';
import { CreatePackDto } from './dto/createPack.dto';
import { UpdatePackDto } from './dto/updatePack.dto';

@Controller('packs')
export class PacksController {
    constructor(private readonly packsService: PacksService) {}

    @Post()
    create(@Body() createPackDto: CreatePackDto) {
        return this.packsService.create(createPackDto);
    }

    @Get()
    getPacks() {
        return this.packsService.getPacks();
    }

    @Get('/:id')
    getPack(@Param('id') id: string) {
        return this.packsService.getPack(+id);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() updatePackDto: UpdatePackDto) {
        return this.packsService.update(+id, updatePackDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.packsService.remove(+id);
    }
}
