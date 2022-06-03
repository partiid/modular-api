import {
    Controller,
    Get,
    Put,
    Post,
    Body,
    Res,
    UseFilters,
    Param,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument, User } from './user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    //@UseGuards(AuthenticatedGuard)
    @Get()
    async getUsers() {
        return await this.UsersService.getUsers();
    }

    //TODO: implement guard that will check if request comes from the user that actually calls this route (or admin)
    @Get('/:login')
    async getUser(@Param('login') login: string) {
        return await this.UsersService.getByUsername(login);
    }

    @Post()
    async createUser(@Body() user: User) {
        return await this.UsersService.create(user);
    }
}
