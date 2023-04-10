"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const incore_model_1 = require("../core/incore-model");
class Country extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'alpha_2_code']),
            properties: this.properties({
                country_id: { type: 'integer' },
                name: { type: 'string' },
                alpha_2_code: { type: 'string' },
                alpha_3_code: { type: 'string' },
            }),
        };
    }
}
exports.Country = Country;
_a = Country;
Country.tableName = 'countries';
Country.idColumn = 'country_id';
Country.relationMappings = _a.rel({});
