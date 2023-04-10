"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const incore_model_1 = require("../core/incore-model");
class Role extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['uniq_id', 'name']),
            properties: this.properties({
                role_id: { type: 'integer' },
                name: { type: 'string' },
                uniq_id: { type: 'string' },
                description: { type: 'string' },
            }),
        };
    }
}
exports.Role = Role;
_a = Role;
Role.tableName = 'roles';
Role.idColumn = 'role_id';
Role.relationMappings = _a.rel({});
