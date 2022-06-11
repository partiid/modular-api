import {
    Catch,
    ExceptionFilter,
    HttpStatus,
    Logger,
    ArgumentsHost,
} from '@nestjs/common';

import { InternalServerErrorException } from '@nestjs/common';

import { ApiResponse } from '../interfaces/index';

@Catch(InternalServerErrorException)
export class MongoErrorFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

        const error = exception.getResponse();
        if (
            (error.hasOwnProperty('code') &&
                error.hasOwnProperty('keyValue')) ||
            (error.hasOwnProperty('message') && error.hasOwnProperty('errors'))
        ) {
            const apiResponse: ApiResponse<any> = {
                status: 400,
                createdBy: 'MongoErrorFilter',
                errors: [error],
                data: [],
            };

            return response.status(400).json(apiResponse);
        }

        Logger.error(
            `${request.method} ${request.url}`,
            error,
            'MongoErrorFilter',
        );

        return response.status(status).json(error);
    }
}
