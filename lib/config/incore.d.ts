/// <reference types="node" />
import { KeyValue, KeyValuePair } from '../interfaces/key-value-pair';
import * as knex from 'knex';
import { Algorithm } from 'jsonwebtoken';
import * as buffer from 'buffer';
import { Router } from 'express';
import { IncoreModel } from '../core/incore-model';
import { IncoreApiRouteMiddleware } from '../interfaces/incore-api-route-middleware';
import { IncoreExpressRequest } from '../interfaces/incore-express-req';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export interface IncoreApiConfig {
    id: string;
    protocol?: string;
    host?: string;
    port?: number;
    path?: string;
    search?: KeyValuePair[];
    hash?: string;
    user?: string;
    pwd?: string;
    authorization?: string;
    contentType: string;
    baseUrl?: string;
    url?: string;
    token?: string;
}
export interface IncoreRouteConfig {
    model: new () => IncoreModel;
    path: string;
    middleware?: IncoreApiRouteMiddleware[];
}
export interface IncoreStorageConfig {
    documentRoot: string;
}
export interface IncoreAuthConfig {
    accessTokenExpiresIn: number | string;
    refreshTokenExpiresIn: number | string;
    tokenSecretKey: string;
    refreshTokenSecretKey: string;
    algorithm: Algorithm;
}
export interface IncoreConfigUploads {
    path: string;
    baseUrl: string;
}
export declare enum IncoreEnv {
    development = "development",
    production = "production",
    test = "test",
    preview = "preview"
}
declare type incoreEnvKeys = keyof typeof IncoreEnv;
export declare type IncoreConfig = {
    [key in incoreEnvKeys]: IncoreConfigEnv;
};
export declare type RoutesRoles = {
    [key: string]: string[];
};
export interface IncoreConfigEnv {
    knex: any;
    auth: IncoreAuthConfig;
    uploads: IncoreConfigUploads;
    incoreState: number;
    routesRoles: RoutesRoles;
    newUsersRoles: string[];
    encryptId: boolean;
}
export declare class Incore {
    private static _router;
    private static _dataId;
    private static _routes;
    private static _knex;
    private static apisList;
    private static currentApiId;
    private static _env;
    private static _config;
    private static _root;
    private static _rootPath;
    private static _securityKey;
    static get config(): IncoreConfigEnv;
    static get securityKey(): buffer.Buffer;
    static defaultApiId(apiId: string): void;
    static set env(env: IncoreEnv);
    static get env(): IncoreEnv;
    static get dataId(): string[];
    static set dataId(name: string | string[]);
    static get currentApi(): string;
    private static getFullUrl;
    private static getBaseUrl;
    static api(apiId?: string): IncoreApiConfig | null;
    static get auth(): IncoreAuthConfig;
    static get accessTokenExpiration(): number | string;
    static get refreshTokenExpiration(): number | string;
    static get algorithm(): Algorithm | undefined;
    static get encId(): boolean;
    static get knex(): knex.Knex;
    static get isTest(): boolean;
    static get isDev(): boolean;
    static get isProd(): boolean;
    static get isPreview(): boolean;
    static bootstrap(config?: {
        routerOptions: any;
    }): Promise<void>;
    static checkRouteRole(req: IncoreExpressRequest): boolean;
    private static createKnexFile;
    private static createRoute;
    static createRoutes(routes: IncoreRouteConfig[]): void;
    static get logDir(): string;
    static get router(): Router;
    static set rootPath(path: string);
    static addApis(...apis: IncoreApiConfig[]): void;
    static addApi(api: IncoreApiConfig): void;
    static updateApi(id: string, ...keyValuePair: KeyValue<IncoreApiConfig>[]): void;
    private static get uploadsPathDate();
    static uploadsBaseUrl(addPath?: string): string;
    static uploadsPath(addPath?: string): string;
    static checkSecurityKey(): Promise<void>;
    static encrypt(data: any): string;
    static encryptId(data: any, idColumn: any): void;
    static isMetadataIdEncrypted(metadataIdContent: any): boolean;
    static decrypt(data: any): string;
    static searchAndDecrypt(data: any): void;
    static searchAndEncrypt(data: any, idColumn: any): void;
    static isEncrypted(data: any): boolean;
    static get rootPath(): string;
}
export {};
