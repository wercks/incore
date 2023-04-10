import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Country extends IncoreModel {
    country_id?: number;
    name: string;
    alpha_2_code: string;
    alpha_3_code: string;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Country = IncoreModelInterface<Country>;
