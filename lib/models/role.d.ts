import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Role extends IncoreModel {
    role_id: number;
    name: string;
    uniq_id: string;
    description: string;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Role = IncoreModelInterface<Role>;
