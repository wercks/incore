import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Gift extends IncoreModel {
    gift_id: number;
    uid: number;
    gifts_group_id: number;
    product_id: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Gift = IncoreModelInterface<Gift>;
