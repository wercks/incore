"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profession = void 0;
const incore_model_1 = require("../core/incore-model");
class Profession extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name']),
            properties: this.properties({
                profession_id: { type: 'integer' },
                media_id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
            }),
        };
    }
}
exports.Profession = Profession;
_a = Profession;
Profession.tableName = 'professions';
Profession.idColumn = 'profession_id';
Profession.relationMappings = _a.rel({});
