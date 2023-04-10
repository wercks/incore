"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const incore_model_1 = require("../core/incore-model");
class Tag extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['uid', 'name', 'name_utf8', 'product_id']),
            properties: this.properties({
                tag_id: { type: 'integer' },
                uid: { type: 'integer' },
                product_id: { type: 'integer' },
                name: { type: 'string' },
                name_utf8: { type: 'string' },
                generic_content_id: { type: ['integer', 'string'] },
            }),
        };
    }
}
exports.Tag = Tag;
_a = Tag;
Tag.tableName = 'tags';
Tag.idColumn = 'tag_id';
Tag.relationMappings = _a.rel({});
