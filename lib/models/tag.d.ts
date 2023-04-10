import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Tag extends IncoreModel {
    tag_id: number;
    uid: number;
    name: string;
    name_utf8: string;
    generic_content_id: any;
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
export declare type $Tag = IncoreModelInterface<Tag>;
