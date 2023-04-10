import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class MerchantConfig extends IncoreModel {
    merchant_config_id: number;
    uid: number;
    default_config: number;
    tax_credit_card: number;
    tax_debit_card: number;
    tax_boleto: number;
    tax_voucher: number;
    tax_bank_transfer: number;
    tax_cash: number;
    tax_pix: number;
    max_installments: number;
    tax_installment: number;
    tax_installment_1: number;
    tax_installment_2: number;
    tax_installment_3: number;
    tax_installment_4: number;
    tax_installment_5: number;
    tax_installment_6: number;
    tax_installment_7: number;
    tax_installment_8: number;
    tax_installment_9: number;
    tax_installment_10: number;
    tax_installment_11: number;
    tax_installment_12: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $MerchantConfig = IncoreModelInterface<MerchantConfig>;
