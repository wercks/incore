import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Cart extends IncoreModel {
    cart_id: number;
    uid: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Cart = IncoreModelInterface<Cart>;
