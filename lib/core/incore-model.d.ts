import { IncoreApiRepository } from './incore-api-repository';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { JSONSchema, Model, ModelOptions, NonFunctionPropertyNames, Pojo, QueryBuilderType, QueryContext } from 'objection';
import { IncoreApiResponse } from '../interfaces/incore-api-response';
import { IncoreApiInstructions } from '../interfaces/incore-api-instructions';
import { IncoreAction } from '../type/incore-action';
export declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export declare type IncoreModelInterface<T> = Omit<NonFunctionProperties<T>, 'QueryBuilderType'>;
export interface BeforeActionExecListenerResponse {
    newInstructions?: IncoreApiInstructions;
    canContinue: boolean;
}
export declare class IncoreModel extends Model {
    static owned: string[];
    created_at?: string;
    updated_at?: string;
    status: number;
    metadata_id?: string | number;
    private queryInstance?;
    private _instructions?;
    private _repository?;
    metadata?: {
        metadata_id?: number;
        related_to_id: string;
        name: string;
        val: any;
    }[];
    protected handleAction(action: IncoreAction): boolean;
    image?(index: number | 'last' | 'first', returnValue?: any): any;
    lastImage?(returnValue?: any): any;
    imageByName?(name: string, returnFirst?: boolean, returnLast?: boolean): any;
    firstImage?(returnValue?: any): any;
    md?(name: string, returnValue?: any): any;
    ipAddr?(): string;
    handle(action: IncoreAction): boolean;
    setRepository(repository: IncoreApiRepository<any>): void;
    repository(): IncoreApiRepository<any>;
    statik(): typeof IncoreModel;
    $this<T>(): T;
    instructions(): IncoreApiInstructions;
    tblName(): string;
    idCol(): string | string[];
    setInstructions(data: IncoreApiInstructions): void;
    useLimitInFirst(): boolean;
    protected static rel(data: any): any;
    protected static metadataRelation(): {
        relation: import("objection").RelationType;
        join: {
            from: string;
            to: string;
        };
    };
    protected static mediaRelation(): {
        relation: import("objection").RelationType;
        join: {
            from: string;
            to: string;
        };
    };
    currentQuery(): QueryBuilderType<Model>;
    resetCurrentQuery(): void;
    showCurrentQuery(): void;
    result?<T>(total?: number | null): Promise<IncoreApiResponse<T>>;
    navigation(total: number, page: number): {
        page: number;
        next: number;
        prev: number;
        pages: number[];
        first: boolean;
        end: boolean;
        offset: number;
        limit: number;
    };
    embed?(): void;
    getEmbedData?(): string;
    offsetLimitOrder?(): void;
    conditions(queryInstance?: QueryBuilderType<Model>): void;
    exec(): Promise<IncoreApiResponse<any> | null>;
    $beforeValidate(jsonSchema: JSONSchema, json: Pojo, opt: ModelOptions): JSONSchema;
    protected static required(data: any[]): any[];
    protected static properties(data: any): any;
    $beforeInsert(queryContext: QueryContext): Promise<any> | void;
    $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): Promise<any> | void;
    $beforeDelete(queryContext: QueryContext): void | Promise<any>;
    $afterFind(queryContext: QueryContext): Promise<any>;
    sanitize(): void;
}
