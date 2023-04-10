import { KeyValuePair } from '../interfaces/key-value-pair';
import { IncoreResponse } from './incore-response';
import { IncoreRequest } from './incore-request';
import * as FormData from 'form-data';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 */
export declare abstract class IncoreRepository<T> {
    protected httpService: IncoreRequest;
    private path;
    private fixedQuery;
    private query;
    private dataId;
    protected abstract setup(): void;
    private _apiId;
    set apiId(id: string);
    private _routes;
    protected emptyRouteScheme: boolean;
    constructor(httpService: IncoreRequest, path: string, apiId?: string);
    setQuery(data: KeyValuePair[]): void;
    setFixedQuery(data: KeyValuePair[]): void;
    protected setPath(path: string, routes?: IncoreRepositoryRoutes): void;
    protected emptyRoutes(): void;
    get routes(): IncoreRepositoryRoutes;
    private addQueryToUrl;
    /**
     *  Sanitize Path
     * @param path
     * @returns string
     */
    private _s;
    update(data: T | FormData, path?: string): Promise<IncoreResponse<T>>;
    patch(data: T | FormData, path?: string): Promise<IncoreResponse<T>>;
    read(params?: any, path?: string): Promise<IncoreResponse<T>>;
    readBy(pair: KeyValuePair, params: any, path?: string): Promise<IncoreResponse<T>>;
    readById(params?: any, path?: string): Promise<IncoreResponse<T>>;
    readAll(params?: any, path?: string): Promise<IncoreResponse<T[]>>;
    del(data?: any, path?: string): Promise<IncoreResponse<T>>;
    create(data: T | FormData, path?: string): Promise<IncoreResponse<T>>;
    set setId(id: number | string);
    get id(): number | string;
}
export interface IncoreRepositoryRoutes {
    read: string;
    del: string;
    update: string;
    create: string;
}
