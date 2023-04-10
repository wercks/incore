import { IncoreModel } from '../core/incore-model';
import { DeliveryDistrict } from './delivery-district';
import { IncoreModelInterface } from '../core/incore-model';
export declare class DeliveryPeriod extends IncoreModel {
    delivery_period_id: number;
    uid: number;
    delivery_district_id: number;
    from: number;
    to: number;
    period_number: 1 | 2 | 3;
    deliveryDistrict: DeliveryDistrict;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $DeliveryPeriod = IncoreModelInterface<DeliveryPeriod>;
