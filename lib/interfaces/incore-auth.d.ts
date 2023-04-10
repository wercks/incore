/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { User } from '../models/user';
import { Token } from './token';
export interface IncoreAuth {
    user: User;
    token: Token;
}
