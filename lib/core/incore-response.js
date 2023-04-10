"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreResponse = void 0;
const incore_code_1 = require("../enum/incore-code");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class IncoreResponse {
    constructor(status, data, message, log) {
        this.message = '';
        this.data = data;
        if (message) {
            this.message = message;
        }
        if (log) {
            this.log = log;
        }
        this.status = status;
    }
    get ok() {
        return (this.status === incore_code_1.IncoreResponseCode.OK ||
            this.status === incore_code_1.IncoreResponseCode.CREATED);
    }
    get hasData() {
        return this.data != null;
    }
    get error() {
        return this.data == null || !this.ok;
    }
    static nullResponseData(status, message, log = '') {
        return new IncoreResponse(status, null, message, log);
    }
    static createResponseData(data, status, message, log) {
        return new IncoreResponse(status, data, message, log);
    }
    static json(data, status, message, res, log) {
        const incoreResponse = IncoreResponse.createResponseData(data, status, message, log);
        res.status(status).json(incoreResponse.res);
    }
    get res() {
        return {
            data: this.data,
            message: this.message,
            paging: this.paging,
            log: this.log,
        };
    }
}
exports.IncoreResponse = IncoreResponse;
