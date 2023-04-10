"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreController = void 0;
const incore_controller_interface_1 = require("./incore-controller-interface");
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class IncoreController extends incore_controller_interface_1.IncoreControllerInterface {
    constructor(repository, path, apiId) {
        super();
        if (repository) {
            this.initRepository(repository, path, apiId);
        }
        this.init();
    }
    async create(data, path) {
        await this.performRequest(() => {
            return this.repository.create(data, path);
        });
    }
    async read(params, path) {
        await this.performRequest(() => {
            return this.repository.read(params, path);
        });
    }
    async readById(id, params, path) {
        await this.performRequest(() => {
            this.repository.setId = id;
            return this.repository.readById(params, path);
        });
    }
    async readAll(params, path) {
        await this.performRequest(() => {
            return this.repository.readAll(params, path);
        });
    }
    async update(id, data, path) {
        await this.performRequest(() => {
            this.repository.setId = id;
            return this.repository.update(data, path);
        });
    }
    async patch(id, data, path) {
        await this.performRequest(() => {
            this.repository.setId = id;
            return this.repository.patch(data, path);
        });
    }
    async del(id, data, path) {
        await this.performRequest(() => {
            this.repository.setId = id;
            return this.repository.del(data, path);
        });
    }
    async performRequest(request) {
        this.apiResponse = await request();
    }
    initRepository(repositoryClass, path, apiId) {
        this.repository = new repositoryClass(this.httpService, path, apiId);
    }
    get error() {
        return this.apiResponse.error;
    }
    get data() {
        return this.apiResponse.data;
    }
    get dataList() {
        return this.apiResponse.data;
    }
    get message() {
        var _a, _b;
        return (_a = this.responseMessage) !== null && _a !== void 0 ? _a : (_b = this.apiResponse) === null || _b === void 0 ? void 0 : _b.message;
    }
    get response() {
        return this.apiResponse;
    }
    get ok() {
        return this.apiResponse.ok;
    }
}
exports.IncoreController = IncoreController;
