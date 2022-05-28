import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }
}
