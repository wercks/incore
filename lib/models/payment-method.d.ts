import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class PaymentMethod extends IncoreModel {
    payment_method_id: number;
    name: string;
    method: 'credit_card' | 'debit_card' | 'boleto' | 'voucher' | 'bank_transfer' | 'cash' | 'pix';
    /**
     * User setting
     */
    enabled: number;
    /**
     * System default setting
     */
    enabled_default: number;
    /**
     * System default setting
     */
    disabled_default: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $PaymentMethod = IncoreModelInterface<PaymentMethod>;
