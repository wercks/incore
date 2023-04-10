import { IncoreApiResponse } from '../interfaces/incore-api-response';
import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
import { City } from './city';
import { District } from './district';
import { CountryState } from './country-state';
import { Country } from './country';
import { AddrGroup } from './addr-group';
import { IncoreAction } from '../type/incore-action';
export declare class Address extends IncoreModel {
    addr_id?: number;
    number: number;
    addr_group_id: number;
    uid: number;
    city_id: number;
    district_id: number;
    country_state_id: number;
    country_id: number;
    zipcode: string;
    street: string;
    complement?: string;
    city?: City;
    district?: District;
    state?: CountryState;
    country?: Country;
    addrGroup?: AddrGroup;
    static tableName: string;
    static idColumn: string;
    protected handleAction(action: IncoreAction): boolean;
    exec(): Promise<IncoreApiResponse<Address> | null>;
    upsert(): Promise<IncoreApiResponse<Address>>;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Address = IncoreModelInterface<Address>;
