import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class GiftsGroupProduct extends IncoreModel {
    gifts_group_product_id: number;
    gifts_group_id: number;
    uid: number;
    product_id: number;
    quantity: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $GiftsGroupProduct = IncoreModelInterface<GiftsGroupProduct>;
