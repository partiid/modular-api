import {
    Catch,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    UseFilters,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserAuthDto } from '../users/dto/userAuth.dto';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { User } from '../users/user.schema';
import { JwtPayload } from './strategy/jwt.strategy';
import * as bcrypt from 'bcrypt';
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
        //get the userid to store in
        const { user_id } = await this.usersService.getByUsername(
            passportResult._doc.username,
        );

        /**
         * @see auth/strategy/jwt.strategy
         */

        const payload: JwtPayload = {
            username: passportResult.username,
            sub: passportResult.userId,
            _userId: user_id,
        };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.signAsync(
            {
                sub: passportResult.userId,
                username: passportResult.username,
                _userId: user_id,
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
     * @description - Validate user credentials based on localstrategy. This function is called first in local.strategy
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

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    /**
     * @param user: User
     * @description - register a user and add a user with the data provided
     */

    async register(dto: User) {
        //check if user already exists
        const { username } = dto;
        try {
            const user = await this.usersService.getByUsername(username);
            if (user) {
                throw new ConflictException('User already exists');
            }
        } catch (e: any) {
            //hash password
            const { password, ...userData } = dto;
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password, salt);

            dto = { password: hashedPassword, ...userData };

            return await this.usersService.create(dto);
        }
    }
}
