"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddrGroup = void 0;
const incore_model_1 = require("../core/incore-model");
class AddrGroup extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name']),
            properties: this.properties({
                addr_group_id: { type: 'integer' },
                uid: { type: 'integer' },
                name: { type: 'string' },
            }),
        };
    }
}
exports.AddrGroup = AddrGroup;
_a = AddrGroup;
AddrGroup.tableName = 'addr_groups';
AddrGroup.idColumn = 'addr_group_id';
AddrGroup.owner = 'admin';
AddrGroup.relationMappings = _a.rel({});
