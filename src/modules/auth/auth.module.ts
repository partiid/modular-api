import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    imports: [UsersModule],
})
export class AuthModule {}
