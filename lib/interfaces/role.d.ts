import { IncoreResponseCode } from '../enum/incore-code';
import { $UserRole } from '../models/user_role';
import { IncoreApiInstructions } from './incore-api-instructions';
export interface RoleResponse {
    granted: boolean;
    code?: IncoreResponseCode;
    message?: string;
}
export declare type RoleMiddleware = (roles: $UserRole[], instructions: IncoreApiInstructions) => RoleResponse;
