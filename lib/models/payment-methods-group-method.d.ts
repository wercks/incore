import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class PaymentMethodGroupMethod extends IncoreModel {
    payment_methods_group_method_id: number;
    payment_methods_group_id: number;
    payment_method_id: number;
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
export declare type $PaymentMethodGroupMethod = IncoreModelInterface<PaymentMethodGroupMethod>;
