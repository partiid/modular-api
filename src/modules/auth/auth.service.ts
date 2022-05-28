import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
    ) {}
    /**
     * @param userAuth: UserAuthDto - username and password
     * @description - Validate user credentials
     * @returns passport user object
     */
    async validateUser(userAuth: UserAuthDto): Promise<any> {
        console.log(userAuth);
        const { username, password } = userAuth;
        const user = await this.usersService.getByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    /**
     * @param user: userAuthDto - username and password
     * @returns refresh token and access token
     */
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.signAsync(
            { sub: user.userId, username: user.username },
            { secret: env.JWT_REFRESH_SECRET },
        );
        const { _doc } = user;
        const { user_id } = _doc;

        await this.usersService.setRefreshToken(user_id, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
