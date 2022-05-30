import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    /**
     *
     * @param passportResult - Passport result object with user and user _doc
     * @returns object with access and refresh token
     */
    async createTokens(passportResult: any) {
        //this.logger.log(`Creating tokens for user:`, user);
        const { user_id } = await this.usersService.getByUsername(
            passportResult._doc.username,
        );

        const payload = {
            username: passportResult.username,
            sub: passportResult.userId,
            userId: user_id,
        };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.signAsync(
            {
                sub: passportResult.userId,
                username: passportResult.username,
                userId: user_id,
            },
            { secret: env.JWT_REFRESH_SECRET, expiresIn: '7d' },
        );
        return {
            accessToken,
            refreshToken,
        };
    }
    /**
     * @param dto: UserAuthDto - username and password
     * @description - Validate user credentials. This function is called first in local.strategy
     * @see auth/strategy/local.strategy
     * @returns passport user object
     */
    async validateUser(dto: UserAuthDto): Promise<any> {
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

        //await this.usersService.setRefreshToken(user_id, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async signup(user: User) {}
}
