// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import {
    MongooseValidationErrorFilter,
    MongoErrorFilter,
} from './filters/index';
import { ApiResponseInterceptor } from './interceptors/ApiResponse.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //implement swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Modular api')
        .setDescription('The modular api')
        .setVersion('1.0')
        .addTag('modular')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    //global pipes
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new MongooseValidationErrorFilter());
    app.useGlobalFilters(new MongoErrorFilter());

    //standarize api response for success
    app.useGlobalInterceptors(new ApiResponseInterceptor());
    //setup passport
    app.use(passport.initialize());
    //setup sessions
    app.use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 3600000 },
        }),
    );
    await app.listen(3000);
}
bootstrap();
