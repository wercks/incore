import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class AddrGroup extends IncoreModel {
    addr_group_id: number;
    uid: number;
    name: string;
    static tableName: string;
    static idColumn: string;
    static owner: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $AddrGroup = IncoreModelInterface<AddrGroup>;
