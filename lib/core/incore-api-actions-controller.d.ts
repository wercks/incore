import { IncoreApiInstructions } from '../interfaces/incore-api-instructions';
import { IncoreExpressRequest } from '../interfaces/incore-express-req';
import { Response } from 'express';
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { IncoreApiResponse } from '../interfaces/incore-api-response';
export declare class IncoreApiActionsController<T> {
    exec: () => any;
    static log(req: IncoreExpressRequest, instructions: IncoreApiInstructions, message: string, err?: any): void;
    static error(err: any, res: Response, req: IncoreExpressRequest, instructions: IncoreApiInstructions): void;
    static unexpectedResult(instructions: IncoreApiInstructions, result: IncoreApiResponse<any>, res: Response, req: IncoreExpressRequest): void;
}
