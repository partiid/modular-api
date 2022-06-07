import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/interfaces';

@Injectable()
export class ApiResponseInterceptor<T>
    implements NestInterceptor<T, ApiResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((data) => {
                const response: ApiResponse<T> = {
                    status: 200,
                    createdBy: 'ApiResponse',
                    data: [data],
                    errors: [],
                };
                return response;
            }),
        );
    }
}
