"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategory = void 0;
const incore_model_1 = require("../core/incore-model");
const category_1 = require("./category");
const product_1 = require("./product");
const metadata_1 = require("../models/metadata");
class ProductCategory extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['category_id', 'uid', 'product_id']),
            properties: this.properties({
                product_category_id: { type: 'integer' },
                category_id: { type: 'integer' },
                product_id: { type: 'integer' },
                uid: { type: 'integer' },
            }),
        };
    }
}
exports.ProductCategory = ProductCategory;
_a = ProductCategory;
ProductCategory.tableName = 'products_categories';
ProductCategory.idColumn = 'product_category_id';
ProductCategory.relationMappings = _a.rel({
    category: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: category_1.Category,
        join: {
            from: 'products_categories.category_id',
            to: 'categories.category_id',
        },
    },
    product: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: product_1.Product,
        join: {
            from: 'products_categories.product_id',
            to: 'products.product_id',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
