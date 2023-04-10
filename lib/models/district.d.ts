import { IncoreModel } from '../core/incore-model';
import { City } from './city';
import { CountryState } from './country-state';
import { Country } from './country';
import { IncoreModelInterface } from '../core/incore-model';
export declare class District extends IncoreModel {
    district_id?: number;
    city_id: number;
    country_state_id: number;
    country_id: number;
    name: string;
    city?: City;
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
export declare type $District = IncoreModelInterface<District>;
