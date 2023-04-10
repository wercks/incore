import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
import { $Role } from './role';
export declare class UserRole extends IncoreModel {
    user_role_id?: number;
    role_id: number;
    uid: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    role: $Role;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $UserRole = IncoreModelInterface<UserRole>;
