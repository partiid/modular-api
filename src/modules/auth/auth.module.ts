import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { env } from 'process';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        UsersModule,
        PassportModule,
        EventEmitterModule.forRoot(),
        JwtModule.register({
            secret: env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
})
export class AuthModule {}
