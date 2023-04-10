import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Category extends IncoreModel {
    category_id: number;
    name: string;
    url: string;
    uid: number;
    media_id: number;
    /**
     * 1 = category - 2 = subcategory
     */
    type: 1 | 2;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Category = IncoreModelInterface<Category>;
