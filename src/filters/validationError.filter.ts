import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch()
export class ValidationErrorFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        return response.status(400).json({
            statusCode: 400,
            createdBy: 'ValidationErrorFilter',
            errors: exception.errors,
        });
    }
}
