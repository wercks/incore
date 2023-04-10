"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftsGroup = void 0;
const incore_model_1 = require("../core/incore-model");
class GiftsGroup extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['uid', 'condition']),
            properties: this.properties({
                gifts_group_id: { type: 'integer' },
                uid: { type: 'integer' },
                total_spent: { type: 'integer' },
                condition: { type: 'string' },
            }),
        };
    }
}
exports.GiftsGroup = GiftsGroup;
_a = GiftsGroup;
GiftsGroup.tableName = 'gifts_group';
GiftsGroup.idColumn = 'gifts_group_id';
GiftsGroup.relationMappings = _a.rel({});
