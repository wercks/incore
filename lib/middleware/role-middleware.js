"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const incore_response_1 = require("../core/incore-response");
const incore_code_1 = require("../enum/incore-code");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
const roleMiddleware = (role) => {
    return (req, res, next) => {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (!user || !user.roles) {
            incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.FORBIDDEN, 'Token de autenticação não enviado!', res);
            return;
        }
        const grant = role(user.roles, req.repository.apiInstructions);
        if (!grant.granted) {
            incore_response_1.IncoreResponse.json(null, grant.code, grant.message, res);
            return;
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
