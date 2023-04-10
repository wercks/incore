"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const incore_model_1 = require("../core/incore-model");
class Coupon extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['title', 'value_type', 'uid', 'code']),
            properties: this.properties({
                coupon_id: { type: 'integer' },
                uid: { type: 'integer' },
                fixed_value: { type: 'integer' },
                title: { type: 'string' },
                valid_until: { type: 'string' },
                description: { type: 'string' },
                value_type: { type: 'string' },
                code: { type: 'string' },
                percent_value: { type: 'number' },
            }),
        };
    }
}
exports.Coupon = Coupon;
_a = Coupon;
Coupon.tableName = 'coupons';
Coupon.idColumn = 'coupon_id';
Coupon.relationMappings = _a.rel({});
