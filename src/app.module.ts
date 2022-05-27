/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://johny2:XtNVMIlyaDEkE4qp@mydb.pm2wz.gcp.mongodb.net/modular-api?retryWrites=true&w=majority',
    ),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}