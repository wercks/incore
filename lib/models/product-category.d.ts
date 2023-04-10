import { IncoreModel } from '../core/incore-model';
import { IncoreModelInterface } from '../core/incore-model';
export declare class ProductCategory extends IncoreModel {
    product_category_id: number;
    category_id: number;
    product_id: number;
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
export declare type $ProductCategory = IncoreModelInterface<ProductCategory>;
