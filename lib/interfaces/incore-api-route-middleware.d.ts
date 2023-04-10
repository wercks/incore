import { IncoreAction } from '../type/incore-action';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { IncoreApiMiddleware } from '../type/incore-middleware';
export interface IncoreApiRouteHandler {
    handler: IncoreApiMiddleware;
    args?: any[];
}
export interface IncoreApiRouteMiddleware {
    action: IncoreAction;
    middleware: IncoreApiRouteHandler[];
}
