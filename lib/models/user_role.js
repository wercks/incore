"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const incore_model_1 = require("../core/incore-model");
const role_1 = require("./role");
class UserRole extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['role_id', 'uid']),
            properties: this.properties({
                user_role_id: { type: 'integer' },
                role_id: { type: 'integer' },
                uid: { type: 'integer' },
            }),
        };
    }
}
exports.UserRole = UserRole;
_a = UserRole;
UserRole.tableName = 'user_roles';
UserRole.idColumn = 'user_role_id';
UserRole.relationMappings = _a.rel({
    role: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: role_1.Role,
        join: {
            from: 'user_roles.role_id',
            to: 'roles.role_id',
        },
    },
});
