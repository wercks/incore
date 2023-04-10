import { IncoreModel } from '../core/incore-model';
import { District } from './district';
import { IncoreModelInterface } from '../core/incore-model';
export declare class DeliveryDistrict extends IncoreModel {
    delivery_district_id: number;
    uid: number;
    district_id: number;
    fee: number;
    time: number;
    time_unit: number;
    district: District;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $DeliveryDistrict = IncoreModelInterface<DeliveryDistrict>;
