import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;
import { ApiResponse } from '../interfaces/index';
@Catch(ValidationError)
export class MongooseValidationErrorFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        const apiResponse: ApiResponse<any> = {
            status: 400,
            createdBy: 'MongooseValidationErrorFilter',
            errors: [exception.errors],
            data: [],
        };

        return response.status(400).json(apiResponse);
    }
}
