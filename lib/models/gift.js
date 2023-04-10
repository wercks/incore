"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gift = void 0;
const incore_model_1 = require("../core/incore-model");
class Gift extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['gifts_group_id', 'uid', 'product_id']),
            properties: this.properties({
                gift_id: { type: 'integer' },
                gifts_group_id: { type: 'integer' },
                uid: { type: 'integer' },
                product_id: { type: 'integer' },
            }),
        };
    }
}
exports.Gift = Gift;
_a = Gift;
Gift.tableName = 'gifts';
Gift.idColumn = 'gift_id';
Gift.relationMappings = _a.rel({});
