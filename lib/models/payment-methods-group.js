"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodGroup = void 0;
const payment_methods_group_method_1 = require("./payment-methods-group-method");
const incore_model_1 = require("../core/incore-model");
const metadata_1 = require("../models/metadata");
class PaymentMethodGroup extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['uid', 'name']),
            properties: this.properties({
                payment_methods_group_id: { type: 'integer' },
                uid: { type: 'integer' },
                name: { type: 'string' },
            }),
        };
    }
}
exports.PaymentMethodGroup = PaymentMethodGroup;
_a = PaymentMethodGroup;
PaymentMethodGroup.tableName = 'payment_methods_groups';
PaymentMethodGroup.idColumn = 'payment_methods_group_id';
PaymentMethodGroup.relationMappings = _a.rel({
    methods: {
        relation: incore_model_1.IncoreModel.HasManyRelation,
        modelClass: payment_methods_group_method_1.PaymentMethodGroupMethod,
        join: {
            from: 'payment_methods_groups.payment_methods_group_id',
            to: 'payment_methods_group_methods.payment_methods_group_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
