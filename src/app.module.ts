/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://johny2:XtNVMIlyaDEkE4qp@mydb.pm2wz.gcp.mongodb.net/modular-api?retryWrites=true&w=majority',
    ),
   

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}