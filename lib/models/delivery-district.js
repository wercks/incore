"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDistrict = void 0;
const incore_model_1 = require("../core/incore-model");
const district_1 = require("./district");
const metadata_1 = require("../models/metadata");
class DeliveryDistrict extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'district_id',
                'uid',
                'fee',
                'time',
                'time_unit',
            ]),
            properties: this.properties({
                delivery_district_id: { type: 'integer' },
                uid: { type: 'integer' },
                district_id: { type: 'integer' },
                fee: { type: 'integer' },
                time: { type: 'integer' },
                time_unit: { type: 'string' },
            }),
        };
    }
}
exports.DeliveryDistrict = DeliveryDistrict;
_a = DeliveryDistrict;
DeliveryDistrict.tableName = 'delivery_districts';
DeliveryDistrict.idColumn = 'delivery_district_id';
DeliveryDistrict.relationMappings = _a.rel({
    district: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: district_1.District,
        join: {
            from: 'delivery_districts.district_id',
            to: 'districts.district_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
