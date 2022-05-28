import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Res() res, @Body() user: UserAuthDto) {
        //return await this.authService.login(user);
        return res.send(await this.authService.validateUser(user));
    }
}
