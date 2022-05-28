// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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
    await app.listen(3000);
}
bootstrap();
