import {
    Catch,
    ExceptionFilter,
    HttpStatus,
    Logger,
    ArgumentsHost,
} from '@nestjs/common';

import { InternalServerErrorException } from '@nestjs/common';

@Catch(InternalServerErrorException)
export class MongoErrorFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

        const error = exception.getResponse();
        if (error.hasOwnProperty('code') && error.hasOwnProperty('keyValue')) {
            return response.status(400).json({
                statusCode: 400,
                createdBy: 'MongoErrorFilter',
                errors: [error],
            });
        }

        Logger.error(
            `${request.method} ${request.url}`,
            error,
            'MongoErrorFilter',
        );

        return response.status(status).json(error);
    }
}
