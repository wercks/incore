"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreMiddlewarePlaceholder = void 0;
const IncoreMiddlewarePlaceholder = (action) => {
    return (req, res, next) => {
        next();
    };
};
exports.IncoreMiddlewarePlaceholder = IncoreMiddlewarePlaceholder;
