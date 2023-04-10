"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreApiActionsController = void 0;
const Objection = require("objection");
const incore_code_1 = require("../enum/incore-code");
const incore_response_1 = require("./incore-response");
class IncoreApiActionsController {
    constructor() {
        this.exec = () => {
            return async (req, res, next) => {
                const repository = req.repository;
                try {
                    let successResponseStatus = incore_code_1.IncoreResponseCode.OK;
                    let repositoryResponse;
                    const handleByModel = repository.model.handle(repository.apiInstructions.action);
                    if (handleByModel) {
                        repositoryResponse = await repository.model.exec();
                    }
                    else {
                        for (let possibleModelMethodName in repository.apiInstructions) {
                            const method = repository.model[possibleModelMethodName];
                            if (typeof method === 'function') {
                                let methodArgs = [];
                                if (Array.isArray(repository.apiInstructions[possibleModelMethodName])) {
                                    methodArgs = [
                                        ...repository.apiInstructions[possibleModelMethodName],
                                    ];
                                }
                                const response = await method.apply(repository.model, methodArgs);
                                if (response && (response === null || response === void 0 ? void 0 : response.code)) {
                                    repositoryResponse = response;
                                }
                            }
                        }
                        if (!repositoryResponse) {
                            switch (repository.apiInstructions.action) {
                                case 'READ':
                                    repositoryResponse = await repository.read();
                                    break;
                                case 'CREATE':
                                    repositoryResponse = await repository.create();
                                    successResponseStatus =
                                        incore_code_1.IncoreResponseCode.CREATED;
                                    break;
                                case 'UPDATE':
                                    repositoryResponse = await repository.update();
                                    break;
                                case 'PATCH':
                                    repositoryResponse = await repository.patch();
                                    break;
                                case 'UPSERT':
                                    repositoryResponse = await repository.upsert();
                                    successResponseStatus =
                                        incore_code_1.IncoreResponseCode.CREATED;
                                    break;
                                case 'DELETE':
                                    repositoryResponse = await repository.del();
                                    break;
                                case 'LOGIN':
                                    repositoryResponse = await repository.login();
                                    break;
                                case 'SIGNUP':
                                    repositoryResponse = await repository.signup();
                                    successResponseStatus =
                                        incore_code_1.IncoreResponseCode.CREATED;
                                    break;
                            }
                        }
                    }
                    if (repositoryResponse.redirectTo) {
                        res.redirect(repositoryResponse.redirectTo);
                        return;
                    }
                    else if (repositoryResponse.text) {
                        res.set('content-type', 'text/plain').send(repositoryResponse.text);
                        return;
                    }
                    else if (repositoryResponse.html) {
                        res.set('content-type', 'text/html').send(repositoryResponse.html);
                        return;
                    }
                    else if (repositoryResponse.js) {
                        res.set('content-type', 'text/javascript').send(repositoryResponse.js);
                        return;
                    }
                    if (repositoryResponse.code !== incore_code_1.IncoreResponseCode.OK) {
                        IncoreApiActionsController.unexpectedResult(repository.apiInstructions, repositoryResponse, res, req);
                        return;
                    }
                    incore_response_1.IncoreResponse.json(repositoryResponse, successResponseStatus, '', res);
                }
                catch (err) {
                    IncoreApiActionsController.error(err, res, req, repository.apiInstructions);
                    return;
                }
            };
        };
    }
    static log(req, instructions, message, err = null) {
        const key = new Date().getTime();
        console.error('--------------- ' + key + ' ------------');
        console.error(req.originalUrl);
        console.error(JSON.stringify(instructions));
        console.error(message);
        if (err) {
            console.error(err);
        }
        console.error('--------------- ' + key + ' ------------');
    }
    static error(err, res, req, instructions) {
        console.log('_____________ERROR_______________');
        console.log(err);
        let message = 'Ocorreu um erro, se persistir, entre em contato!';
        let statusCode = incore_code_1.IncoreResponseCode.INTERNAL_SERVER_ERROR;
        let log = '';
        if (err instanceof Objection.ValidationError) {
            console.log('_____________ValidationError_______________');
            // {someProp: [{message: 'required property missing', ...}]}
            console.log(err.data);
            log = JSON.stringify(err.data);
            statusCode = incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY;
            message = 'Ocorreu um erro, os dados enviados são inválidos!';
        }
        else if (err === null || err === void 0 ? void 0 : err.message) {
            message = err.message;
        }
        const incoreResponse = incore_response_1.IncoreResponse.createResponseData(null, statusCode, message, log);
        IncoreApiActionsController.log(req, instructions, message, err);
        res.status(statusCode).json(incoreResponse.res);
    }
    static unexpectedResult(instructions, result, res, req) {
        var _a, _b, _c;
        if (result.code == incore_code_1.IncoreResponseCode.ERROR) {
            IncoreApiActionsController.log(req, instructions, (_a = result.message) !== null && _a !== void 0 ? _a : 'unexpectedResult', result);
            incore_response_1.IncoreResponse.json(result, incore_code_1.IncoreResponseCode.INTERNAL_SERVER_ERROR, (_b = result.message) !== null && _b !== void 0 ? _b : 'unexpectedResult', res);
            return;
        }
        else if (instructions.action === 'LOGIN' ||
            instructions.action === 'SIGNUP') {
            let message = 'Dados inválidos!';
            let statusCode = incore_code_1.IncoreResponseCode.FORBIDDEN;
            if (result.code !== incore_code_1.IncoreResponseCode.OK) {
                switch (result.code) {
                    case incore_code_1.IncoreResponseCode.NOT_FOUND:
                        message = 'Usuário não encontrado para este login!';
                        break;
                    case incore_code_1.IncoreResponseCode.FORBIDDEN:
                        message = 'Senha inválida!';
                        break;
                    case incore_code_1.IncoreResponseCode.BAD_REQUEST:
                        statusCode = incore_code_1.IncoreResponseCode.BAD_REQUEST;
                        message = result.message;
                        break;
                }
                IncoreApiActionsController.log(req, instructions, message);
                incore_response_1.IncoreResponse.json(result, statusCode, message, res);
                return;
            }
        }
        else if (result.code !== incore_code_1.IncoreResponseCode.OK) {
            let message = (_c = result.message) !== null && _c !== void 0 ? _c : 'Ocorreu um erro!';
            IncoreApiActionsController.log(req, instructions, message);
            incore_response_1.IncoreResponse.json(result, result.code, message, res);
            return;
        }
    }
}
exports.IncoreApiActionsController = IncoreApiActionsController;
