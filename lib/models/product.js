"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const incore_model_1 = require("../core/incore-model");
const media_1 = require("./media");
const metadata_1 = require("../models/metadata");
class Product extends incore_model_1.IncoreModel {
    constructor() {
        super(...arguments);
        this.content_language = 'pt';
        this.target_country = 'BR';
        this.condition = 'NEW';
        this.gender = 'UNISEX';
        this.price_currency = 'BRL';
        this.sale_price_currency = 'BRL';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['uid', 'title', 'description']),
            properties: this.properties({
                product_id: { type: 'integer' },
                uid: { type: 'integer' },
                featured: { type: 'integer' },
                offer_id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: 'string' },
                url: { type: 'string' },
                mobile_url: { type: 'string' },
                media_id: { type: 'integer' },
                content_language: { type: 'string' },
                target_country: { type: 'string' },
                feed_label: { type: 'string' },
                channel: { type: 'string' },
                brand: { type: 'string' },
                expiration_date: { type: 'string' /*, format: 'date'*/ },
                availability_date: { type: 'string' /*, format: 'date'*/ },
                sale_price_effective_start_date: {
                    type: 'string',
                },
                sale_price_effective_end_date: {
                    type: 'string',
                },
                adult: { type: 'integer' },
                age_group: { type: 'integer' },
                availability: { type: 'integer' },
                group_id: { type: 'integer' },
                color: { type: 'string' },
                condition: { type: 'string' },
                gender: { type: 'string' },
                gtin: { type: 'string' },
                material: { type: 'string' },
                mpn: { type: 'string' },
                pattern: { type: 'string' },
                price: { type: 'integer' },
                price_currency: { type: 'string' },
                sale_price: { type: 'integer' },
                sale_price_currency: { type: 'string' },
                height: { type: 'integer' },
                height_unit: { type: 'string' },
                length: { type: 'integer' },
                length_unit: { type: 'string' },
                width: { type: 'integer' },
                weight_unit: { type: 'string' },
                sizes: { type: 'string' },
                installments: { type: 'integer' },
                delivery: { type: 'integer' },
                paused: { type: 'integer' },
                ingredient: { type: 'integer' },
            }),
        };
    }
}
exports.Product = Product;
_a = Product;
Product.tableName = 'products';
Product.idColumn = 'product_id';
Product.relationMappings = _a.rel({
    media: Object.assign({ modelClass: media_1.Media }, _a.mediaRelation()),
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
