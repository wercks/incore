"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaMiddleware = void 0;
const incore_1 = require("../config/incore");
const mediaMiddleware = (path) => {
    return async (req, res, next) => {
        var _a, _b;
        let files = [];
        const action = req.repository.apiInstructions.action;
        if (req.file) {
            files.push(req.file);
        }
        else if (req.files) {
            files = req.files;
        }
        if (!files.length) {
            next();
            return;
        }
        const allMedia = [];
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            allMedia.push({
                source: `${incore_1.Incore.uploadsPath(path)}/${f.filename}`,
                url: `${incore_1.Incore.uploadsBaseUrl(path)}/${f.filename}`,
            });
        }
        const instructions = JSON.parse((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.instructions) !== null && _b !== void 0 ? _b : '{}');
        req.repository.apiInstructions = Object.assign(Object.assign({}, instructions), { action: action, media: allMedia });
        next();
    };
};
exports.mediaMiddleware = mediaMiddleware;
