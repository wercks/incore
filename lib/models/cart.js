"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const incore_model_1 = require("../core/incore-model");
const cart_item_1 = require("./cart-item");
const metadata_1 = require("../models/metadata");
class Cart extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['uid']),
            properties: this.properties({
                cart_id: { type: 'integer' },
                uid: { type: 'integer' },
            }),
        };
    }
}
exports.Cart = Cart;
_a = Cart;
Cart.tableName = 'cart';
Cart.idColumn = 'cart_id';
Cart.relationMappings = _a.rel({
    items: {
        relation: incore_model_1.IncoreModel.HasManyRelation,
        modelClass: cart_item_1.CartItem,
        join: {
            from: 'cart.cart_id',
            to: 'cart_items.cart_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
