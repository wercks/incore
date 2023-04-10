/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { Router } from 'express';
export interface ApiRouteInterface {
    path: string;
    router: Router;
}
