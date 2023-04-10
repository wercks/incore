import { IncoreResponseCode } from '../enum/incore-code';
import { IncorePaging } from '../interfaces/incore-paging';
import { Response } from 'express';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare class IncoreResponse<T> {
    constructor(status: IncoreResponseCode, data: T, message?: string, log?: string);
    data: T;
    paging: IncorePaging;
    message: string;
    log?: string;
    status: number;
    get ok(): boolean;
    get hasData(): boolean;
    get error(): boolean;
    static nullResponseData<T>(status: number, message: string, log?: string): IncoreResponse<T>;
    static createResponseData<T>(data: any, status: number, message: string, log?: string): IncoreResponse<T>;
    static json<T>(data: any, status: number, message: string, res: Response, log?: string): void;
    get res(): {
        data: T;
        message: string;
        paging: IncorePaging;
        log?: string;
    };
}
