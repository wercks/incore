import { IncoreAction } from '../type/incore-action';
import { NextFunction, Response } from 'express';
import { IncoreExpressRequest } from '../interfaces/incore-express-req';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare const routeRolesMiddleware: (action: IncoreAction) => (req: IncoreExpressRequest, res: Response, next: NextFunction) => Promise<void>;
