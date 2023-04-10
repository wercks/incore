import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class PaymentMethodGroup extends IncoreModel {
    payment_methods_group_id: number;
    uid: number;
    name: string;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $PaymentMethodGroup = IncoreModelInterface<PaymentMethodGroup>;
