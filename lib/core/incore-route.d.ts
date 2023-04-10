import { IncoreRouteManager } from './incore-route-manager';
import { IncoreRepository } from './incore-repository';
import { IncoreController } from './incore-controller';
/**
 * @author Wercks de Oliveira
 *
 */
export declare class IncoreRoute<T, R extends IncoreRepository<T>, C extends IncoreController<T, R>> extends IncoreRouteManager<T, R, C> {
    protected configure(): void;
    protected initializeRoutes(): void;
}
