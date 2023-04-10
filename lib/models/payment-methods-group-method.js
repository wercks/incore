"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodGroupMethod = void 0;
const incore_model_1 = require("../core/incore-model");
class PaymentMethodGroupMethod extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'payment_methods_group_id',
                'payment_method_id',
            ]),
            properties: this.properties({
                payment_methods_group_method_id: { type: 'integer' },
                payment_methods_group_id: { type: 'integer' },
                payment_method_id: { type: 'integer' },
            }),
        };
    }
}
exports.PaymentMethodGroupMethod = PaymentMethodGroupMethod;
_a = PaymentMethodGroupMethod;
PaymentMethodGroupMethod.tableName = 'payment_methods_group_methods';
PaymentMethodGroupMethod.idColumn = 'payment_methods_group_method_id';
PaymentMethodGroupMethod.relationMappings = _a.rel({});
