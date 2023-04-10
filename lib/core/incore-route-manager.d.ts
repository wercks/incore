import { IncoreRouteMiddleware } from '../interfaces/incore-route-middleware';
import { IncoreApiActions } from '../enum/incore-api-actions';
import { IncoreMiddleware } from '../type/incore-middleware';
import { IncoreActionsController } from '../core/incore-actions-controller';
import { IncoreRepository } from './incore-repository';
import { IncoreController } from './incore-controller';
import { ApiRouteInterface } from '../interfaces/api-route';
import { Multer } from 'multer';
export declare abstract class IncoreRouteManager<T, R extends IncoreRepository<T>, C extends IncoreController<T, R>> implements ApiRouteInterface {
    private _path;
    router: import("express-serve-static-core").Router;
    protected controller: IncoreActionsController<T, R, C>;
    protected middleware: IncoreRouteMiddleware[];
    constructor(controller: C, path: string, middleware?: IncoreRouteMiddleware[]);
    getMiddleware(action: IncoreApiActions): IncoreMiddleware[];
    get path(): string;
    protected multer(path?: string): Multer;
    protected abstract configure(): void;
    protected abstract initializeRoutes(): void;
    protected get readRoute(): string;
    protected get readAllRoute(): string;
    protected get updateRoute(): string;
    protected get createRoute(): string;
    protected get deleteRoute(): string;
    protected get patchRoute(): string;
}
