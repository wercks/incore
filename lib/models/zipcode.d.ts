import { IncoreResponseCode } from '../enum/incore-code';
import { IncoreModel } from '../core/incore-model';
import { IncoreApiResponse } from '../interfaces/incore-api-response';
import { CountryState } from './country-state';
import { City } from './city';
export declare class ZipCode extends IncoreModel {
    static tableName: string;
    static idColumn: string;
    exec(): Promise<IncoreApiResponse<any> | null>;
    findAddr(): Promise<{
        code: IncoreResponseCode;
        message: any;
        item?: undefined;
    } | {
        code: IncoreResponseCode;
        item: {
            state: CountryState;
            city: City;
            address: ZipCodeResponse;
        };
        message?: undefined;
    }>;
}
interface ZipCodeResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro: any;
}
export {};
