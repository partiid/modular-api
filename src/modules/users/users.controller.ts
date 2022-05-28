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
import { ValidationErrorFilter } from 'src/filters/validationError.filter';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller('users')
@UseFilters(new ValidationErrorFilter())
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}
    @UseGuards(AuthenticatedGuard)
    @Get()
    async getUsers() {
        return await this.UsersService.getUsers();
    }
    @Get('/user/:login')
    async getUser(@Res() res, @Param('login') login: string) {
        return res.send(await this.UsersService.getByUsername(login));
    }
    @Post()
    async createUser(@Res() res, @Body() user: User) {
        return res.send(await this.UsersService.create(user));
    }
}
