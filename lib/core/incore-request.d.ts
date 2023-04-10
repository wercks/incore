import { IncoreResponse } from './incore-response';
import * as FormData from 'form-data';
/**
 * @author Wercks de Oliveira
 *
 */
export declare abstract class IncoreRequest {
    private _apiId;
    abstract request<T>(method: keyof {
        post: 'post';
        put: 'put';
        patch: 'patch';
        get: 'get';
    }, route: string, data: any): Promise<IncoreResponse<any>>;
    set apiId(id: string);
    get apiId(): string;
    abstract post<T>(route: string, data: any): Promise<IncoreResponse<T>>;
    abstract delete<T>(route: string, data?: any): Promise<IncoreResponse<T>>;
    abstract put<T>(route: string, data: any): Promise<IncoreResponse<T>>;
    abstract patch<T>(route: string, data: any): Promise<IncoreResponse<T>>;
    abstract get<T>(route: string, params?: any): Promise<IncoreResponse<T>>;
    abstract upload<T>(route: string, data: FormData): Promise<IncoreResponse<T>>;
}
