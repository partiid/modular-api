import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    /**
     *
     * @param user - user object from passport
     * @returns object with access and refresh token
     */
    async createTokens(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.signAsync(
            { sub: user.userId, username: user.username },
            { secret: env.JWT_REFRESH_SECRET },
        );
        return {
            accessToken,
            refreshToken,
        };
    }
    /**
     * @param dto: UserAuthDto - username and password
     * @description - Validate user credentials
     * @returns passport user object
     */
    async validateUser(dto: UserAuthDto): Promise<any> {
        console.log(dto);
        const { username, password } = dto;
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
        const { accessToken, refreshToken } = await this.createTokens(user);
        const { _doc } = user;
        const { user_id } = _doc;

        await this.usersService.setRefreshToken(user_id, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async signup(user: User) {}
}
