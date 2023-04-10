import { IncoreResponse } from './incore-response';
import { IncoreHttpService } from './incore-http-service';
import { IncoreControllerInterface } from './incore-controller-interface';
import { IncoreRepository } from './incore-repository';
import * as FormData from 'form-data';
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare abstract class IncoreController<T, R extends IncoreRepository<T>> extends IncoreControllerInterface {
    apiResponse: IncoreResponse<T>;
    protected repository: R;
    protected responseMessage: string;
    protected obj: T;
    constructor(repository: new (httpService: IncoreHttpService, path: string, apiId?: string) => R, path: string, apiId?: string);
    create(data: T | FormData, path?: string): Promise<void>;
    read(params?: any, path?: string): Promise<void>;
    readById(id: number | string, params?: any, path?: string): Promise<void>;
    readAll(params?: any, path?: string): Promise<void>;
    update(id: number | string, data: T, path?: string): Promise<void>;
    patch(id: number | string, data: T, path?: string): Promise<void>;
    del(id: number | string, data?: any, path?: string): Promise<void>;
    protected performRequest(request: Function): Promise<void>;
    protected initRepository(repositoryClass: new (httpService: IncoreHttpService, path: string, apiId?: string) => R, path: string, apiId?: string): void;
    get error(): boolean;
    get data(): T;
    get dataList(): any;
    get message(): string;
    get response(): IncoreResponse<T>;
    get ok(): boolean;
}
