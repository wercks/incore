"use strict";
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreControllerInterface = void 0;
const incore_http_service_1 = require("./incore-http-service");
class IncoreControllerInterface {
    constructor() {
        this.httpService = new incore_http_service_1.IncoreHttpService();
    }
}
exports.IncoreControllerInterface = IncoreControllerInterface;
