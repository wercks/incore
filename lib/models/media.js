"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const incore_model_1 = require("../core/incore-model");
class Media extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['source', 'url']),
            properties: this.properties({
                media_id: { type: 'integer' },
                source: { type: 'string' },
                url: { type: 'string' },
                type: { type: 'integer' },
                width: { type: 'integer' },
                height: { type: 'integer' },
                x: { type: 'integer' },
                y: { type: 'integer' },
                duration: { type: 'integer' },
                color_filter: { type: 'string' },
                format: { type: 'string' },
                mimetype: { type: 'string' },
                resolution: { type: 'string' },
                aspect_ratio: { type: 'string' },
                bit_rate: { type: 'string' },
                frame_rate: { type: 'string' },
                channels: { type: 'string' },
                sampling_rate: { type: 'string' },
                commercial_name: { type: 'string' },
                compression_mode: { type: 'string' },
                bit_depth: { type: 'string' },
                size: { type: 'integer' },
                related_to: { type: 'string' },
            }),
        };
    }
}
exports.Media = Media;
_a = Media;
Media.tableName = 'media';
Media.idColumn = 'media_id';
Media.relationMappings = _a.rel({});
