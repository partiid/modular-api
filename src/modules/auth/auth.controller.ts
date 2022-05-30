import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../../guards/auth/localAuth.guard';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { User } from '../users/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: User) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }
}
