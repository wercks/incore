import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
import { Country } from './country';
export declare class CountryState extends IncoreModel {
    country_state_id?: number;
    country_id: number;
    name: string;
    code: string;
    country?: Country;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $CountryState = IncoreModelInterface<CountryState>;
