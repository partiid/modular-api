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
import { ValidationErrorFilter } from '../../filters/validationError.filter';
import { AuthenticatedGuard } from '../../guards/auth/authenticated.guard';

@Controller('users')
@UseFilters(new ValidationErrorFilter())
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    //@UseGuards(AuthenticatedGuard)
    @Get()
    async getUsers() {
        return await this.UsersService.getUsers();
    }

    //TODO: implement guard that will check if request comes from the user that actually calls this route (or admin)
    @Get('/:login')
    async getUser(@Res() res, @Param('login') login: string) {
        return res.send(await this.UsersService.getByUsername(login));
    }

    @Post()
    async createUser(@Res() res, @Body() user: User) {
        return res.send(await this.UsersService.create(user));
    }
}
