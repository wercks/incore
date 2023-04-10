"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeRolesMiddleware = void 0;
const incore_1 = require("../config/incore");
const incore_response_1 = require("../core/incore-response");
const incore_code_1 = require("../enum/incore-code");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
const routeRolesMiddleware = (action) => {
    return async (req, res, next) => {
        if (!incore_1.Incore.checkRouteRole(req)) {
            incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.FORBIDDEN, 'Route protected!', res);
            return;
        }
        next();
    };
};
exports.routeRolesMiddleware = routeRolesMiddleware;
