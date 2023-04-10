import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class GiftsGroup extends IncoreModel {
    gifts_group_id: number;
    uid: number;
    total_spent: number;
    condition: 'MONEY_SPENT' | 'PRODUCTS';
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $GiftsGroup = IncoreModelInterface<GiftsGroup>;
