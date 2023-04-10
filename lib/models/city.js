"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const objection_1 = require("objection");
const incore_model_1 = require("../core/incore-model");
const country_state_1 = require("./country-state");
const country_1 = require("./country");
const metadata_1 = require("../models/metadata");
class City extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'country_id', 'country_state_id']),
            properties: this.properties({
                city_id: { type: 'integer' },
                country_state_id: { type: 'integer' },
                country_id: { type: 'integer' },
                name: { type: 'string' },
            }),
        };
    }
}
exports.City = City;
_a = City;
City.tableName = 'cities';
City.idColumn = 'city_id';
City.relationMappings = _a.rel({
    state: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: country_state_1.CountryState,
        join: {
            from: 'cities.country_state_id',
            to: 'country_states.country_state_id',
        },
    },
    country: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: country_1.Country,
        join: {
            from: 'cities.country_id',
            to: 'countries.country_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
