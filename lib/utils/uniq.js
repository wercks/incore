"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.Uniq = void 0;
const crypto = require("crypto");
const Uniq = () => {
    const dateStr = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${dateStr}-${randomStr}`;
};
exports.Uniq = Uniq;
const random = (size) => {
    return crypto.randomBytes(size).toString('hex');
};
exports.random = random;
