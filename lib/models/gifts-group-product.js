"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftsGroupProduct = void 0;
const incore_model_1 = require("../core/incore-model");
class GiftsGroupProduct extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'uid',
                'gifts_group_id',
                'product_id',
                'quantity',
            ]),
            properties: this.properties({
                gifts_group_product_id: { type: 'integer' },
                gifts_group_id: { type: 'integer' },
                uid: { type: 'integer' },
                product_id: { type: 'integer' },
                quantity: { type: 'integer' },
            }),
        };
    }
}
exports.GiftsGroupProduct = GiftsGroupProduct;
_a = GiftsGroupProduct;
GiftsGroupProduct.tableName = 'gifts_group_products';
GiftsGroupProduct.idColumn = 'gifts_group_product_id';
GiftsGroupProduct.relationMappings = _a.rel({});
