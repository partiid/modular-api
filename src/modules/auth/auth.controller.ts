import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async validateUser(@Res() res, @Body() user: UserAuthDto) {
        //return await this.authService.login(user);
        return res.send(await this.authService.validateUser(user));
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return req.user;
    }
}
