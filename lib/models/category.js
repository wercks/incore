"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const incore_model_1 = require("../core/incore-model");
const media_1 = require("./media");
const metadata_1 = require("../models/metadata");
class Category extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'uid', 'url']),
            properties: this.properties({
                category_id: { type: 'integer' },
                uid: { type: 'integer' },
                media_id: { type: 'integer' },
                name: { type: 'string' },
                url: { type: 'string' },
            }),
        };
    }
}
exports.Category = Category;
_a = Category;
Category.tableName = 'categories';
Category.idColumn = 'category_id';
Category.relationMappings = _a.rel({
    media: Object.assign({ modelClass: media_1.Media }, _a.mediaRelation()),
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
