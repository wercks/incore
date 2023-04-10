"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = void 0;
const multer_storage_1 = require("../utils/multer-storage");
const multer = require("multer");
const multerStorage = (path = '') => {
    return multer({ storage: (0, multer_storage_1.storage)(path) });
};
const uploadService = (path) => {
    const upload = multerStorage(path !== null && path !== void 0 ? path : '');
    return upload.any();
};
exports.uploadService = uploadService;
