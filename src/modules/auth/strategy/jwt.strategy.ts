import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from 'process';

/**
 * JWT strategy
 */
export interface JwtPayload {
    username: string;
    sub: string;
    _userId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        return {
            userId: payload.sub,
            username: payload.username,
            _userId: payload._userId,
        };
    }
}
