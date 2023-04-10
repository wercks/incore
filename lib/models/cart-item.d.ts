import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class CartItem extends IncoreModel {
    cart_item_id: number;
    cart_id: number;
    uid: number;
    product_id: number;
    /**
     * Set here because the product can change after its price
     */
    price: number;
    total_price: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $CartItem = IncoreModelInterface<CartItem>;
