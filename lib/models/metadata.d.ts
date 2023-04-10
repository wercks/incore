import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Metadata extends IncoreModel {
    related_to_id: string;
    name: string;
    val: any;
    static tableName: string;
    static idColumn: string;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Metadata = IncoreModelInterface<Metadata>;
