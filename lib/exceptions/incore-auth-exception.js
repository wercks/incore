"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreAuthException = void 0;
class IncoreAuthException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.IncoreAuthException = IncoreAuthException;
