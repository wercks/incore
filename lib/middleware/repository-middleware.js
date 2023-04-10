"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryMiddleWare = void 0;
const incore_repository_factory_1 = require("../core/incore-repository-factory");
const incore_1 = require("../config/incore");
const type_validator_1 = require("../utils/type-validator");
const incore_response_1 = require("../core/incore-response");
const incore_code_1 = require("../enum/incore-code");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
const repositoryMiddleWare = (action, model) => {
    return async (req, res, next) => {
        var _a, _b, _c, _d, _e, _f;
        let instructions;
        if (req.method == 'GET') {
            const query = (_a = req.query) !== null && _a !== void 0 ? _a : {};
            const params = (_b = req.params) !== null && _b !== void 0 ? _b : {};
            const body = (_c = req.body) !== null && _c !== void 0 ? _c : {};
            instructions = Object.assign(Object.assign(Object.assign({}, query), params), body);
            instructions.data = Object.assign({}, instructions);
        }
        else {
            if (req.headers['content-type'] == 'multipart/form-data') {
                instructions = (_d = req.body.instructions) !== null && _d !== void 0 ? _d : {};
            }
            else {
                instructions = req.body;
            }
        }
        const modelInstance = new model();
        const repository = new incore_repository_factory_1.IncoreApiRepositoryFactory(modelInstance);
        if (instructions.data) {
            await incore_1.Incore.checkSecurityKey();
            incore_1.Incore.searchAndDecrypt(instructions.data);
        }
        if (instructions.id) {
            await incore_1.Incore.checkSecurityKey();
            const characters = `${instructions.id}`;
            if (incore_1.Incore.isEncrypted(characters)) {
                const tryDecrypt = incore_1.Incore.decrypt(characters);
                if (tryDecrypt) {
                    if ((0, type_validator_1.isNumber)(tryDecrypt)) {
                        instructions.id = Number(tryDecrypt);
                    }
                    else {
                        instructions.id = tryDecrypt;
                    }
                }
                else {
                    incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY, 'Error decode encrypted data!', res);
                }
            }
            else {
                incore_response_1.IncoreResponse.json(null, incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY, 'Unexpected ID', res);
            }
        }
        repository.apiInstructions = Object.assign(Object.assign({}, instructions), { action: action, id: (_e = instructions.id) !== null && _e !== void 0 ? _e : (_f = req.params) === null || _f === void 0 ? void 0 : _f.id });
        repository.request = req;
        req.repository = repository;
        next();
    };
};
exports.repositoryMiddleWare = repositoryMiddleWare;
