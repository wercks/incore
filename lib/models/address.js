"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const incore_code_1 = require("../enum/incore-code");
const incore_status_1 = require("../enum/incore-status");
const objection_1 = require("objection");
const incore_model_1 = require("../core/incore-model");
const city_1 = require("./city");
const district_1 = require("./district");
const country_state_1 = require("./country-state");
const country_1 = require("./country");
const addr_group_1 = require("./addr-group");
const metadata_1 = require("../models/metadata");
class Address extends incore_model_1.IncoreModel {
    handleAction(action) {
        return ['UPDATE', 'CREATE', 'UPSERT', 'DELETE'].includes(action);
    }
    async exec() {
        switch (this.instructions().action) {
            case 'UPDATE':
            case 'CREATE':
                return this.upsert();
        }
        return null;
    }
    async upsert() {
        let { street, district, state, addr_number, complement, city, zipcode, addr_id, uid, } = this.instructions().data;
        let addrData = {
            addr_group_id: 1,
            city_id: city.city_id,
            country_id: 1,
            country_state_id: state.country_state_id,
            district_id: district === null || district === void 0 ? void 0 : district.district_id,
            number: addr_number,
            street: street,
            complement: complement,
            zipcode: zipcode,
            uid: uid,
            status: incore_status_1.IncoreStatus.ACTIVE,
        };
        if (addr_id) {
            await Address.query().where('addr_id', addr_id).update(addrData);
        }
        else {
            const districtData = {
                city_id: city.city_id,
                country_state_id: state.country_state_id,
                country_id: 1,
                name: district.name,
                status: incore_status_1.IncoreStatus.ACTIVE,
            };
            const districtResponse = await district_1.District.query().insert(districtData);
            const addrResponse = await Address.query().insert(Object.assign(Object.assign({}, addrData), { district_id: districtResponse.district_id }));
            addr_id = addrResponse.addr_id;
        }
        const addr = await Address.query()
            .where('addr_id', addr_id)
            .withGraphFetched('[city, district, state]')
            .first();
        return {
            code: incore_code_1.IncoreResponseCode.OK,
            item: addr,
            total: 1,
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'number',
                'uid',
                'addr_group_id',
                'city_id',
                'district_id',
                'country_state_id',
                'country_id',
                'zipcode',
                'street',
            ]),
            properties: this.properties({
                addr_id: { type: 'integer' },
                number: { type: 'integer' },
                addr_group_id: { type: 'integer' },
                uid: { type: 'integer' },
                city_id: { type: 'integer' },
                district_id: { type: 'integer' },
                country_state_id: { type: 'integer' },
                country_id: { type: 'integer' },
                zipcode: { type: 'string' },
                street: { type: 'string' },
                complement: { type: 'string' },
            }),
        };
    }
}
exports.Address = Address;
_a = Address;
Address.tableName = 'addresses';
Address.idColumn = 'addr_id';
Address.relationMappings = _a.rel({
    city: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: city_1.City,
        join: {
            from: 'addresses.city_id',
            to: 'cities.city_id',
        },
    },
    district: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: district_1.District,
        join: {
            from: 'addresses.district_id',
            to: 'districts.district_id',
        },
    },
    state: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: country_state_1.CountryState,
        join: {
            from: 'addresses.country_state_id',
            to: 'country_states.country_state_id',
        },
    },
    country: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: country_1.Country,
        join: {
            from: 'addresses.country_id',
            to: 'countries.country_id',
        },
    },
    addrGroup: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: addr_group_1.AddrGroup,
        join: {
            from: 'addresses.addr_group_id',
            to: 'addr_groups.addr_group_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
