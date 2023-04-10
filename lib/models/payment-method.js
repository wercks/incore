"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
const incore_model_1 = require("../core/incore-model");
class PaymentMethod extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'method', 'enabled']),
            properties: this.properties({
                payment_method_id: { type: 'integer' },
                name: { type: 'string' },
                method: { type: 'string' },
                enabled: { type: 'integer' },
                enabled_default: { type: 'integer' },
                disabled_default: { type: 'integer' },
            }),
        };
    }
}
exports.PaymentMethod = PaymentMethod;
_a = PaymentMethod;
PaymentMethod.tableName = 'payment_methods';
PaymentMethod.idColumn = 'payment_method_id';
PaymentMethod.relationMappings = _a.rel({});
