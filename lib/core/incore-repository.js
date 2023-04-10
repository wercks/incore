"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreRepository = void 0;
const incore_endpoints_helper_1 = require("./incore-endpoints-helper");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 */
class IncoreRepository {
    constructor(httpService, path, apiId) {
        this.httpService = httpService;
        this.path = '';
        this.fixedQuery = [];
        this.query = [];
        this.dataId = 0;
        this._routes = {
            create: 'add',
            del: 'del',
            read: '',
            update: 'update',
        };
        this.emptyRouteScheme = true;
        this.setup();
        this.path = path;
        this.apiId = apiId;
        this.httpService.apiId = this._apiId;
    }
    set apiId(id) {
        this._apiId = id;
    }
    setQuery(data) {
        this.query = data;
    }
    setFixedQuery(data) {
        this.fixedQuery = data;
    }
    setPath(path, routes) {
        this.path = path;
        if (routes) {
            this._routes = routes;
        }
        else if (this.emptyRouteScheme) {
            this.emptyRoutes();
        }
    }
    emptyRoutes() {
        this._routes = {
            create: '',
            del: '',
            read: '',
            update: '',
        };
    }
    get routes() {
        return this._routes;
    }
    addQueryToUrl(url) {
        const params = incore_endpoints_helper_1.IncoreEndpointsHelper.searchParams(this.fixedQuery.concat(this.query));
        if (params) {
            url += `?${params}`;
        }
        return url;
    }
    /**
     *  Sanitize Path
     * @param path
     * @returns string
     */
    _s(path) {
        if (!path) {
            return '';
        }
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }
        return path;
    }
    async update(data, path) {
        if (!this.dataId) {
            throw new Error('ID não informado!');
        }
        return await this.httpService.put(this.addQueryToUrl(`${this.path}/${this._routes.update}/${this.dataId}${this._s(path)}`), data);
    }
    async patch(data, path) {
        if (!this.dataId) {
            throw new Error('ID não informado!');
        }
        return await this.httpService.patch(this.addQueryToUrl(`${this.path}/${this._routes.update}/${this.dataId}${this._s(path)}`), data);
    }
    async read(params, path) {
        return await this.httpService.get(this.addQueryToUrl(`${this.path}${this._routes.read}${this._s(path)}`), params);
    }
    async readBy(pair, params, path) {
        return await this.httpService.get(this.addQueryToUrl(`${this.path}/${pair.key}/${pair.value}${this._s(path)}`), params);
    }
    async readById(params, path) {
        return await this.httpService.get(this.addQueryToUrl(`${this.path}/${this.dataId}${this._s(path)}`), params);
    }
    async readAll(params, path) {
        return await this.httpService.get(this.addQueryToUrl(`${this.path}${this._s(path)}`), params);
    }
    async del(data, path) {
        if (!this.dataId) {
            throw new Error('ID não informado!');
        }
        return await this.httpService.delete(this.addQueryToUrl(`${this.path}/${this._routes.del}/${this.dataId}${this._s(path)}`), data);
    }
    async create(data, path) {
        return await this.httpService.post(this.addQueryToUrl(`${this.path}/${this._routes.create}${this._s(path)}`), data);
    }
    set setId(id) {
        this.dataId = id;
    }
    get id() {
        return this.dataId;
    }
}
exports.IncoreRepository = IncoreRepository;
