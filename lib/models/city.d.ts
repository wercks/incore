import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
import { CountryState } from './country-state';
import { Country } from './country';
export declare class City extends IncoreModel {
    city_id?: number;
    country_state_id: number;
    country_id: number;
    name: string;
    state?: CountryState;
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
export declare type $City = IncoreModelInterface<City>;
