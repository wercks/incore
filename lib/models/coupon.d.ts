import { IncoreModel } from '../core/incore-model';
import { IncoreSplitValueMethod } from '../type/incore-split-value-method';
import { IncoreModelInterface } from '../core/incore-model';
export declare class Coupon extends IncoreModel {
    coupon_id: number;
    uid: number;
    title: string;
    value_type: IncoreSplitValueMethod;
    description: string;
    valid_until: string;
    fixed_value: number;
    percent_value: number;
    code: string;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Coupon = IncoreModelInterface<Coupon>;
