"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreRequest = void 0;
/**
 * @author Wercks de Oliveira
 *
 */
class IncoreRequest {
    constructor() {
        this._apiId = '';
    }
    set apiId(id) {
        this._apiId = id;
    }
    get apiId() {
        return this._apiId;
    }
}
exports.IncoreRequest = IncoreRequest;
