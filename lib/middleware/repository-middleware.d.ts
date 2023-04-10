import { IncoreAction } from '../type/incore-action';
import { NextFunction, Response } from 'express';
import { IncoreExpressRequest } from '../interfaces/incore-express-req';
import { IncoreModel } from '../core/incore-model';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare const repositoryMiddleWare: (action: IncoreAction, model: new () => IncoreModel) => (req: IncoreExpressRequest, res: Response, next: NextFunction) => Promise<void>;
