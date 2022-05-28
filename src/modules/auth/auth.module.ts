import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
    imports: [
        UsersModule,
        PassportModule.register({ session: true }),
        JwtModule.register({
            secret: env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
})
export class AuthModule {}
