import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationErrorFilter } from './filters/validationError.filter';

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
    await app.listen(3000);
}
bootstrap();
