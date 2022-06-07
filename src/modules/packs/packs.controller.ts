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
import { Pack } from './pack.schema';
@Controller('packs')
export class PacksController {
    constructor(private readonly packsService: PacksService) {}

    @Post()
    create(@Body() dto: Pack) {
        return this.packsService.create(dto);
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
