import { IncoreApiRouteManager } from './incore-api-route-manager';
import { IncoreApiRepository } from './incore-api-repository';
/**
 * @author Wercks de Oliveira
 *
 */
export declare class IncoreApiRoute<T, R extends IncoreApiRepository<T>> extends IncoreApiRouteManager<T, R> {
    protected configure(): void;
    protected initializeRoutes(): void;
}
