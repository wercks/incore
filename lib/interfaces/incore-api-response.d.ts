import { IncoreResponse } from '../core/incore-response';
import { IncoreResponseCode } from '../enum/incore-code';
import { Token } from './token';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export interface IncoreApiResponseNavigation {
    page: number;
    next: number;
    prev: number;
    pages: number[];
    first: boolean;
    end: boolean;
    offset: number;
    limit: number;
}
export interface IncoreApiResponse<T> {
    total?: number;
    item?: T;
    items?: T[];
    token?: Token;
    refreshToken?: Token;
    code: IncoreResponseCode;
    statusCode?: IncoreResponseCode;
    message?: string;
    response?: IncoreResponse<T>;
    navigation?: IncoreApiResponseNavigation;
    redirectTo?: string;
    html?: string;
    js?: string;
    text?: string;
}
