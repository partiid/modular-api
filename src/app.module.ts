/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { env } from 'process';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      env.MONGODB_CONNECTION,
    ),
   

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}