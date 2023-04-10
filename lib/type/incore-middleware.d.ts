import { IncoreApiActions } from '../enum/incore-api-actions';
import { IncoreExpressRequest } from '../interfaces/incore-express-req';
import { NextFunction, Response } from 'express';
export declare type IncoreMiddleware = (action: IncoreApiActions) => any;
export declare type IncoreApiMiddlewareReturnType = (req: IncoreExpressRequest, res: Response, next: NextFunction) => any;
export declare type IncoreApiMiddleware = (...args: any[]) => IncoreApiMiddlewareReturnType;
