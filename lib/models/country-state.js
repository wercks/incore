"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryState = void 0;
const objection_1 = require("objection");
const incore_model_1 = require("../core/incore-model");
const country_1 = require("./country");
const metadata_1 = require("../models/metadata");
class CountryState extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'country_id', 'code']),
            properties: this.properties({
                country_state_id: { type: 'integer' },
                country_id: { type: 'integer' },
                name: { type: 'string' },
                code: { type: 'string' },
            }),
        };
    }
}
exports.CountryState = CountryState;
_a = CountryState;
CountryState.tableName = 'country_states';
CountryState.idColumn = 'country_state_id';
CountryState.relationMappings = _a.rel({
    country: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: country_1.Country,
        join: {
            from: 'country_states.country_id',
            to: 'countries.country_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
