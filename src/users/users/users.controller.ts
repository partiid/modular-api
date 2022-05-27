import { Controller, Get, Put, Post, Body, Res, UseFilters } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDocument, User } from './user.schema'
import { ValidationErrorFilter } from 'src/filters/validationError.filter';

@Controller('users')
@UseFilters(new ValidationErrorFilter())
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}
    @Get()
    async getUsers() {
        return await this.UsersService.getUsers();
    }
    @Post()
    async createUser(@Res() res, @Body() user: User) {
        return res.send(await this.UsersService.createUser(user));
    }
}
