"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
const incore_model_1 = require("../core/incore-model");
class Metadata extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'val']),
            properties: this.properties({
                metadata_id: { type: 'integer' },
                // related_to_id: { type: ['string', 'number'] },
                name: { type: 'string' },
                // val: { type: ['string', 'number'] },
            }),
        };
    }
}
exports.Metadata = Metadata;
Metadata.tableName = 'metadata';
Metadata.idColumn = 'metadata_id';
