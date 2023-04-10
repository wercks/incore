"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.District = void 0;
const incore_model_1 = require("../core/incore-model");
const city_1 = require("./city");
const country_state_1 = require("./country-state");
const country_1 = require("./country");
const metadata_1 = require("../models/metadata");
class District extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'name',
                'city_id',
                'country_state_id',
                'country_id',
            ]),
            properties: this.properties({
                district_id: { type: 'integer' },
                city_id: { type: 'integer' },
                country_id: { type: 'integer' },
                country_state_id: { type: 'integer' },
                name: { type: 'string' },
            }),
        };
    }
}
exports.District = District;
_a = District;
District.tableName = 'districts';
District.idColumn = 'district_id';
District.relationMappings = _a.rel({
    city: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: city_1.City,
        join: {
            from: 'districts.city_id',
            to: 'cities.city_id',
        },
    },
    state: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: country_state_1.CountryState,
        join: {
            from: 'districts.country_state_id',
            to: 'country_states.country_state_id',
        },
    },
    country: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: country_1.Country,
        join: {
            from: 'districts.country_id',
            to: 'countries.country_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
