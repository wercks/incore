"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantConfig = void 0;
const incore_model_1 = require("../core/incore-model");
class MerchantConfig extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'uid',
                'default_config',
                'tax_credit_card',
                'tax_debit_card',
                'tax_boleto',
                'tax_voucher',
                'tax_bank_transfer',
                'tax_cash',
                'tax_pix',
                'max_installments',
                'tax_installment',
                'tax_installment_1',
                'tax_installment_2',
                'tax_installment_3',
                'tax_installment_4',
                'tax_installment_5',
                'tax_installment_6',
                'tax_installment_7',
                'tax_installment_8',
                'tax_installment_9',
                'tax_installment_10',
                'tax_installment_11',
                'tax_installment_12',
                'recipient_id',
            ]),
            properties: this.properties({
                merchant_config_id: { type: 'integer' },
                default_config: { type: 'integer' },
                uid: { type: 'integer' },
                tax_credit_card: { type: 'number' },
                tax_debit_card: { type: 'number' },
                tax_boleto: { type: 'number' },
                tax_voucher: { type: 'number' },
                tax_bank_transfer: { type: 'number' },
                tax_safety_pay: { type: 'number' },
                tax_cash: { type: 'number' },
                tax_pix: { type: 'number' },
                max_installments: { type: 'number' },
                tax_installment: { type: 'number' },
                tax_installment_1: { type: 'number' },
                tax_installment_2: { type: 'number' },
                tax_installment_3: { type: 'number' },
                tax_installment_4: { type: 'number' },
                tax_installment_5: { type: 'number' },
                tax_installment_6: { type: 'number' },
                tax_installment_7: { type: 'number' },
                tax_installment_8: { type: 'number' },
                tax_installment_9: { type: 'number' },
                tax_installment_10: { type: 'number' },
                tax_installment_11: { type: 'number' },
                tax_installment_12: { type: 'number' },
                recipient_id: { type: 'string' },
                recipient_token: { type: 'string' },
            }),
        };
    }
}
exports.MerchantConfig = MerchantConfig;
_a = MerchantConfig;
MerchantConfig.tableName = 'merchants_config';
MerchantConfig.idColumn = 'merchant_config_id';
MerchantConfig.relationMappings = _a.rel({});
