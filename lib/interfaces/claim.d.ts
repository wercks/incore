import { IncoreResponseCode } from '../enum/incore-code';
import { $User } from '../models/user';
import { IncoreApiInstructions } from './incore-api-instructions';
export interface ClaimResponse {
    granted: boolean;
    code?: IncoreResponseCode;
    message?: string;
}
export declare type Claim = (user: $User, instructions: IncoreApiInstructions) => ClaimResponse;
