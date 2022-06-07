/**
 * ApiResponse interface standarizes the response from the API - no matter if successfull or not
 */
export interface ApiResponse<T> {
    status: number;
    createdBy: string;
    data: T[];
    errors: any[];
}
