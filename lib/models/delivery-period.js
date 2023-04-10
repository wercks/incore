"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPeriod = void 0;
const incore_model_1 = require("../core/incore-model");
const delivery_district_1 = require("./delivery-district");
const metadata_1 = require("../models/metadata");
class DeliveryPeriod extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'delivery_district_id',
                'uid',
                'from',
                'to',
                'period_number',
            ]),
            properties: this.properties({
                delivery_period_id: { type: 'integer' },
                uid: { type: 'integer' },
                delivery_district_id: { type: 'integer' },
                from: { type: 'integer' },
                to: { type: 'integer' },
                period_number: { type: 'integer' },
            }),
        };
    }
}
exports.DeliveryPeriod = DeliveryPeriod;
_a = DeliveryPeriod;
DeliveryPeriod.tableName = 'delivery_periods';
DeliveryPeriod.idColumn = 'delivery_period_id';
DeliveryPeriod.relationMappings = _a.rel({
    deliveryDistrict: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: delivery_district_1.DeliveryDistrict,
        join: {
            from: 'delivery_periods.delivery_district_id',
            to: 'delivery_districts.delivery_district_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
