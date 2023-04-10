/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { IncoreApiActions } from '../enum/incore-api-actions';
import { IncoreMiddleware } from '../type/incore-middleware';
export interface IncoreRouteMiddleware {
    action: IncoreApiActions;
    middleware: IncoreMiddleware;
}
