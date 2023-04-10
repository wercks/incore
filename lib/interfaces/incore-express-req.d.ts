import { IncoreApiRepository } from '../core/incore-api-repository';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { $User } from '../models/user';
import { Request } from 'express';
import { $Media } from '../models/media';
export interface IncoreExpressRequest extends Request {
    user: $User;
    media: $Media[];
    repository: IncoreApiRepository<any>;
}
