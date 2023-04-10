"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const incore_model_1 = require("../core/incore-model");
const product_1 = require("./product");
const metadata_1 = require("../models/metadata");
class CartItem extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required([
                'cart_id',
                'uid',
                'product_id',
                'price',
                'total_price',
            ]),
            properties: this.properties({
                cart_item_id: { type: 'integer' },
                cart_id: { type: 'integer' },
                uid: { type: 'integer' },
                product_id: { type: 'integer' },
                price: { type: 'integer' },
                total_price: { type: 'integer' },
            }),
        };
    }
}
exports.CartItem = CartItem;
_a = CartItem;
CartItem.tableName = 'cart_items';
CartItem.idColumn = 'cart_item_id';
CartItem.relationMappings = _a.rel({
    product: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: product_1.Product,
        join: {
            from: 'cart_items.product_id',
            to: 'products.product_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
