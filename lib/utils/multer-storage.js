"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer = require("multer");
const crypto = require("crypto");
const file_utils_1 = require("./file-utils");
const incore_1 = require("../config/incore");
const storage = (path) => {
    path = path === null || path === void 0 ? void 0 : path.replace('./', '');
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadsPath = incore_1.Incore.uploadsPath(path);
            if (!(0, file_utils_1.fileExists)(uploadsPath)) {
                (0, file_utils_1.mkdir)(uploadsPath, true);
            }
            cb(null, uploadsPath);
        },
        filename: function (req, file, cb) {
            cb(null, `${crypto.randomBytes(16).toString('hex')}-${file.originalname}`);
        },
    });
};
exports.storage = storage;
