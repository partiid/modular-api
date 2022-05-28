import {
    Controller,
    Get,
    Put,
    Post,
    Body,
    Res,
    UseFilters,
    Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument, User } from './user.schema';
import { ValidationErrorFilter } from 'src/filters/validationError.filter';

@Controller('users')
@UseFilters(new ValidationErrorFilter())
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}
    @Get()
    async getUsers() {
        return await this.UsersService.getUsers();
    }
    @Get('/user/:login')
    async getUser(@Res() res, @Param('login') login: string) {
        return res.send(await this.UsersService.getUserByUsername(login));
    }
    @Post()
    async createUser(@Res() res, @Body() user: User) {
        return res.send(await this.UsersService.createUser(user));
    }
}
