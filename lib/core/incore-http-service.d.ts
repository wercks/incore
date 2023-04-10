import { IncoreRequest } from '../core/incore-request';
import { IncoreResponse } from '../core/incore-response';
import * as FormData from 'form-data';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare class IncoreHttpService extends IncoreRequest {
    processing: boolean;
    type: string;
    private client;
    customURL: string;
    constructor(customURL?: string);
    upload<T>(path: string, data: FormData): Promise<IncoreResponse<any>>;
    request<T>(method: keyof {
        post: 'post';
        put: 'put';
        delete: 'delete';
        get: 'get';
        upload: 'upload';
        patch: 'patch';
    }, path: any, data: any): Promise<IncoreResponse<any>>;
    get<T>(path: string, params?: any): Promise<IncoreResponse<T>>;
    post<T>(path: string, data: any): Promise<IncoreResponse<T>>;
    delete<T>(path: string, data?: any): Promise<IncoreResponse<T>>;
    patch<T>(path: string, data: any): Promise<IncoreResponse<T>>;
    put<T>(path: string, data: any): Promise<IncoreResponse<T>>;
}
