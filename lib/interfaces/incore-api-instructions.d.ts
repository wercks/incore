/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { $Media } from '../models/media';
import { Metadata } from '../models/metadata';
import { IncoreAction } from '../type/incore-action';
export interface IncoreSignupData {
}
export declare enum IncoreApiMetadataActions {
    add = 1,
    update = 2,
    updateOrAdd = 3,
    deleteIfExists = 4
}
export interface IncoreDataConflict {
    field: string;
    op?: string;
    message: string;
}
export interface IncoreApiExecInstructions {
    action: string;
    params: {
        [prop: string]: any;
    };
}
export interface UpdatePasswordInstructions {
    current: string;
    confirm: string;
}
export interface IncoreApiInstructionStorage {
    path: string;
    name: string;
}
export interface IncoreApiSearchInstruction {
    term: string;
    in: string[];
}
export interface IncoreApiInstructions {
    updatePassword?: UpdatePasswordInstructions;
    action?: IncoreAction;
    filters?: any[][][];
    limit?: number;
    /**
     * @deprecated
     */
    exec?: IncoreApiExecInstructions;
    offset?: number;
    id?: number | string;
    first?: boolean;
    count?: boolean;
    embed?: string;
    search?: IncoreApiSearchInstruction;
    data?: any;
    metadata?: Metadata[];
    page?: number;
    totalPages?: number;
    order?: {
        by: string;
        dir: 'asc' | 'desc' | 'ASC' | 'DESC';
    };
    passwordField?: string;
    conflict?: IncoreDataConflict[];
    login?: string;
    password?: string;
    loginFields?: string[];
    next?: IncoreApiInstructions;
    params?: any;
    path?: string;
    /**
     * Incore apiId configuration
     */
    apiId?: string;
    media?: $Media[];
    storage?: IncoreApiInstructionStorage;
    crypt?: string[];
    /**
     * Other
     */
    controller?: string;
    config?: {
        silent?: boolean;
    };
}
export declare const embedHelper: (...data: string[]) => string;
