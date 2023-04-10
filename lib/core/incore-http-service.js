"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreHttpService = void 0;
const incore_request_1 = require("../core/incore-request");
const axios_1 = require("axios");
const incore_response_1 = require("../core/incore-response");
const incore_code_1 = require("../enum/incore-code");
const incore_1 = require("../config/incore");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class IncoreHttpService extends incore_request_1.IncoreRequest {
    constructor(customURL) {
        super();
        this.processing = false;
        this.type = '';
        this.client = axios_1.default.create();
        if (customURL) {
            this.customURL = customURL;
        }
    }
    async upload(path, data) {
        return await this.request('upload', path, data);
    }
    async request(method, path, data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const config = {};
        const api = incore_1.Incore.api(this.apiId);
        if (api === null) {
            throw new Error("The api details wasn't been found!");
        }
        config.headers = {};
        config.headers = {};
        if (api.authorization) {
            config.headers['Authorization'] = `${api.authorization + (api.token ? ' ' + `${api.token}` : '')}`;
        }
        if (!api.contentType) {
            throw new Error("The Content-Type doesn't be found in api settings");
        }
        config.headers['Content-Type'] = api.contentType;
        config.baseURL = api.baseUrl;
        this.processing = true;
        try {
            let response;
            switch (method) {
                case 'get':
                    if (data) {
                        config.params = data;
                    }
                    response = await this.client[method](path, config);
                    break;
                case 'delete':
                    if (data) {
                        config.data = data;
                    }
                    response = await this.client[method](path, config);
                    break;
                case 'upload':
                    response = await this.client.post(path, data, config);
                    break;
                default:
                    response = await this.client[method](path, data, config);
                    break;
            }
            this.processing = false;
            console.log('[::]=========| response.data |=========[::]');
            console.log(JSON.stringify(response.data));
            const ResponseData = (_a = response.data.data) !== null && _a !== void 0 ? _a : response.data;
            if (ResponseData &&
                (response.status === incore_code_1.IncoreResponseCode.OK ||
                    response.status === incore_code_1.IncoreResponseCode.CREATED)) {
                return new incore_response_1.IncoreResponse(response.status, ResponseData, '', (_b = response.data.token) !== null && _b !== void 0 ? _b : '');
            }
            else {
                return incore_response_1.IncoreResponse.nullResponseData(response.status, response.data.message);
            }
        }
        catch (error) {
            this.processing = false;
            console.log('ERROR: ', (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data.message) !== null && _d !== void 0 ? _d : error.message);
            console.log('ERROR DATA: ', (_e = error.response) === null || _e === void 0 ? void 0 : _e.data);
            console.log('ERROR: ', error);
            if (error instanceof axios_1.AxiosError) {
                const errorInfo = error;
                const data = (_f = errorInfo.data) !== null && _f !== void 0 ? _f : (_g = error === null || error === void 0 ? void 0 : error.response) === null || _g === void 0 ? void 0 : _g.data;
                return incore_response_1.IncoreResponse.createResponseData(data !== null && data !== void 0 ? data : null, (_j = (_h = error.response) === null || _h === void 0 ? void 0 : _h.status) !== null && _j !== void 0 ? _j : incore_code_1.IncoreResponseCode.BAD_REQUEST, (_l = (_k = error.response) === null || _k === void 0 ? void 0 : _k.data.message) !== null && _l !== void 0 ? _l : error.message);
            }
            return incore_response_1.IncoreResponse.nullResponseData((_o = (_m = error.response) === null || _m === void 0 ? void 0 : _m.status) !== null && _o !== void 0 ? _o : incore_code_1.IncoreResponseCode.BAD_REQUEST, 'Ocorreu um erro desconhecido!');
        }
    }
    async get(path, params) {
        return await this.request('get', path, params);
    }
    async post(path, data) {
        return await this.request('post', path, data);
    }
    async delete(path, data) {
        return await this.request('delete', path, data);
    }
    async patch(path, data) {
        return await this.request('patch', path, data);
    }
    put(path, data) {
        return this.request('put', path, data);
    }
}
exports.IncoreHttpService = IncoreHttpService;
