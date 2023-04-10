"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const incore_model_1 = require("../core/incore-model");
const metadata_1 = require("./metadata");
const user_1 = require("./user");
class Notification extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['from_uid', 'to_uid', 'message', 'title']),
            properties: this.properties({
                notification_id: { type: 'integer' },
                from_uid: { type: 'integer' },
                to_uid: { type: 'integer' },
                category: { type: 'integer' },
                message: { type: 'string' },
                title: { type: 'string' },
                related_to: { type: 'string' },
            }),
        };
    }
}
exports.Notification = Notification;
_a = Notification;
Notification.tableName = 'notifications';
Notification.idColumn = 'notification_id';
Notification.relationMappings = _a.rel({
    user: {
        relation: incore_model_1.IncoreModel.HasOneRelation,
        modelClass: user_1.User,
        join: {
            from: 'notifications.from_uid',
            to: 'users.uid',
        },
    },
    metadata: Object.assign({ modelClass: metadata_1.Metadata }, _a.metadataRelation()),
});
