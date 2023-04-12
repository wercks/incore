"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const incore_response_1 = require("../core/incore-response");
const incore_code_1 = require("../enum/incore-code");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../models/user");
const constants_1 = require("../core/constants");
const incore_1 = require("../config/incore");
const authMiddleware = () => {
    return async (req, res, next) => {
        try {
            const action = req.repository.apiInstructions.action;
            let Authorization = req.cookies['Authorization'] ||
                (req.header('Authorization')
                    ? req.header('Authorization').split('Bearer ')[1]
                    : null);
            if (Authorization) {
                let secretKey = incore_1.Incore.auth.tokenSecretKey;
                if (action == 'REFRESH') {
                    secretKey = incore_1.Incore.auth.refreshTokenSecretKey;
                }
                let verificationResponse;
                try {
                    verificationResponse = (0, jsonwebtoken_1.verify)(Authorization, secretKey);
                }
                catch (err) {
                    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                        incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.UNAUTHORIZED, 'Invalid auth token!', res);
                    }
                    else {
                        incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.FORBIDDEN, 'Invalid auth token!', res);
                    }
                }
                await incore_1.Incore.checkSecurityKey();
                const decrypt = incore_1.Incore.decrypt(verificationResponse.uid);
                if (decrypt) {
                    verificationResponse.uid = parseInt(decrypt);
                }
                const findUser = await user_1.User.query()
                    .findById(verificationResponse.uid)
                    .withGraphFetched(action != 'REFRESH' ? 'roles.[role]' : constants_1.Embed.user);
                if (findUser) {
                    if (action == 'REFRESH') {
                        const token = req.repository.createToken(findUser);
                        const refreshToken = req.repository.createRefreshToken(findUser);
                        const data = {
                            code: incore_code_1.IncoreResponseCode.OK,
                            token: token,
                            refreshToken: refreshToken,
                            item: findUser,
                        };
                        incore_response_1.IncoreResponse.json(data, incore_code_1.IncoreResponseCode.OK, 'Invalid auth token!', res);
                        return;
                    }
                    req.user = findUser;
                    next();
                }
                else {
                    incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.FORBIDDEN, 'Invalid auth token!', res);
                }
            }
            else {
                incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.FORBIDDEN, 'Token does not exists!', res);
            }
        }
        catch (error) {
            console.error('========| ERRO NO SERVIDOR AO AUTENTICAR |========');
            console.error(error);
            incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.INTERNAL_SERVER_ERROR, 'Server error!', res);
        }
    };
};
exports.authMiddleware = authMiddleware;
