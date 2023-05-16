"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incore = exports.IncoreEnv = void 0;
const url_1 = require("url");
const string_util_1 = require("../utils/string-util");
const knex = require("knex");
const crypto = require("crypto");
const database_structure_1 = require("./database-structure");
const file_utils_1 = require("../utils/file-utils");
const file_utils_2 = require("../utils/file-utils");
const path = require("path");
const buffer = require("buffer");
const express_1 = require("express");
const objection_1 = require("objection");
const incore_api_route_1 = require("../core/incore-api-route");
const incore_routes_1 = require("./incore-routes");
const incore_tbl_1 = require("../models/incore-tbl");
const type_validator_1 = require("../utils/type-validator");
var IncoreEnv;
(function (IncoreEnv) {
    IncoreEnv["development"] = "development";
    IncoreEnv["production"] = "production";
    IncoreEnv["test"] = "test";
    IncoreEnv["preview"] = "preview";
})(IncoreEnv = exports.IncoreEnv || (exports.IncoreEnv = {}));
class Incore {
    static get config() {
        return Object.assign({}, this._config[this._env]);
    }
    static get securityKey() {
        return this._securityKey;
    }
    static defaultApiId(apiId) {
        this.currentApiId = apiId;
    }
    static set env(env) {
        this._env = env;
    }
    static get env() {
        return this._env;
    }
    static get dataId() {
        return this._dataId;
    }
    static set dataId(name) {
        if (!name) {
            return;
        }
        const arr = Array.isArray(name) ? name : [name];
        arr.forEach(id => {
            if (!this._dataId.includes(id)) {
                this._dataId.push(id);
            }
        });
    }
    static get currentApi() {
        return `${this.currentApiId}:${this._env}`;
    }
    static getFullUrl(api) {
        const url = new url_1.URL(`${api.protocol}://${api.host}`);
        if (api.path)
            url.pathname = api.path;
        if (api.hash)
            url.hash = api.hash;
        if (api.search)
            api.search.forEach(s => url.searchParams.append(s.key, s.value));
        if (api.user)
            url.username = api.user;
        if (api.pwd)
            url.password = api.pwd;
        if (api.port)
            url.port = `${api.port}`;
        return url.toString();
    }
    static getBaseUrl(api) {
        const url = new url_1.URL(`${api.protocol}://${api.host}${api.port ? `:${api.port}` : ''}${api.path ? `${api.path}` : ''}`);
        // if (api.path) url.pathname = api.path
        // if (api.user) url.username = api.user
        // if (api.pwd) url.password = api.pwd
        // if (api.port) url.port = `${api.port}`
        return string_util_1.IncoreString.rtrim(url.toString(), '/');
    }
    static api(apiId) {
        let api;
        apiId = apiId || this.currentApi;
        if (apiId) {
            const findApi = Incore.apisList.find(a => a.id == apiId);
            if (findApi) {
                api = findApi;
            }
            else {
                return null;
            }
        }
        else {
            api = Incore.apisList[0];
        }
        if (!api.baseUrl) {
            api.baseUrl = Incore.getBaseUrl(api);
        }
        if (!api.url) {
            api.url = Incore.getFullUrl(api);
        }
        return Object.assign({}, api);
    }
    static get auth() {
        return this.config.auth;
    }
    static get accessTokenExpiration() {
        var _a;
        let ttl = (_a = this.config.auth) === null || _a === void 0 ? void 0 : _a.accessTokenExpiresIn;
        if (ttl === -1 || !ttl) {
            ttl = '360d';
        }
        return ttl;
    }
    static get refreshTokenExpiration() {
        var _a;
        let ttl = (_a = this.config.auth) === null || _a === void 0 ? void 0 : _a.refreshTokenExpiresIn;
        if (ttl === -1 || !ttl) {
            ttl = '360d';
        }
        return ttl;
    }
    static get algorithm() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.algorithm) !== null && _c !== void 0 ? _c : undefined;
    }
    static get encId() {
        var _a, _b;
        return (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.encryptId) !== null && _b !== void 0 ? _b : true;
    }
    static get knex() {
        return this._knex;
    }
    static get isTest() {
        return Incore.env == IncoreEnv.test;
    }
    static get isDev() {
        return Incore.env == IncoreEnv.development;
    }
    static get isProd() {
        return Incore.env == IncoreEnv.production;
    }
    static get isPreview() {
        return Incore.env == IncoreEnv.preview;
    }
    static async bootstrap(config) {
        var _a, _b, _c;
        if (!this._router) {
            this._router = (0, express_1.Router)(config === null || config === void 0 ? void 0 : config.routerOptions);
        }
        if (this._routes && this._routes.length) {
            this._routes.forEach(r => this._router.use('/', r.router));
            this._routes = [...[]];
        }
        this.createRoutes(incore_routes_1.incoreRoutes);
        const incoreConfig = await (0, file_utils_1.requireUncached)(`${this.rootPath}/incore.json`);
        if (!incoreConfig) {
            throw new Error('incore.json not found!');
        }
        this._config = incoreConfig;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.knex)) {
            throw new Error('knex must be set in incore.json');
        }
        this._knex = knex.knex(this.config.knex);
        objection_1.Model.knex(this._knex);
        this.createKnexFile();
        const recreateTables = ((_b = this.config) === null || _b === void 0 ? void 0 : _b.incoreState) === undefined ||
            ((_c = this.config) === null || _c === void 0 ? void 0 : _c.incoreState) === 0;
        if (recreateTables) {
            try {
                //await dropTables(knex)
                console.log('Creating tables...');
                await (0, database_structure_1.createTables)(this._knex);
                console.log('Done creating tables!');
                console.log('Seeding...');
                await (0, database_structure_1.seed)(this._knex);
                console.log('Done seeding!');
                this._config[this._env].incoreState = 1;
                (0, file_utils_2.filePutContents)(this.rootPath, 'incore.json', JSON.stringify(this._config));
            }
            catch (e) {
                throw new Error(e === null || e === void 0 ? void 0 : e.message);
            }
        }
        else {
            console.log('If you want to create tables again, set incoreState = 0 in incore.json');
        }
    }
    static checkRouteRole(req) {
        var _a, _b, _c;
        const url = new url_1.URL(req.url, `http://${req.headers.host}`);
        const user = req === null || req === void 0 ? void 0 : req.user;
        const routeRoles = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.routesRoles) !== null && _b !== void 0 ? _b : {};
        const userRoles = (_c = user === null || user === void 0 ? void 0 : user.roles) !== null && _c !== void 0 ? _c : [];
        const find = (pathRoles) => {
            let found = false;
            for (let x of userRoles) {
                if (pathRoles.find(pr => pr == x.role.uniq_id)) {
                    found = true;
                    break;
                }
            }
            return found;
        };
        for (let p in routeRoles) {
            const path = p.trim();
            const pathRoles = routeRoles[path];
            if (!Array.isArray(pathRoles) || pathRoles[0] === '*') {
                continue;
            }
            if (path === '*') {
                return find(pathRoles);
            }
            if (path.includes('r:')) {
                const regex = new RegExp(path.split('r:').pop(), 'g');
                if (regex.test(path)) {
                    return find(pathRoles);
                }
            }
            if (path.startsWith('/') &&
                path.endsWith('/') &&
                (url.pathname.endsWith(string_util_1.IncoreString.rtrim(path, '/')) ||
                    url.pathname.endsWith(path))) {
                const hasId = req.repository.apiInstructions.id;
                if (!hasId) {
                    return find(pathRoles);
                }
            }
            if (url.pathname.includes(path) &&
                (url.pathname.endsWith(string_util_1.IncoreString.rtrim(path, '/')) ||
                    url.pathname.endsWith(path))) {
                return find(pathRoles);
            }
        }
        return true;
    }
    static createKnexFile() {
        const data = `module.exports = ${JSON.stringify(this.config.knex)}`;
        (0, file_utils_2.filePutContents)(this.rootPath, 'knexfile.js', data);
    }
    static createRoute(model, path, middleware) {
        const route = new incore_api_route_1.IncoreApiRoute(model, path, middleware);
        if (!this._router) {
            this._routes.push(route);
        }
        else {
            this._router.use('/', route.router);
        }
    }
    static createRoutes(routes) {
        routes.forEach(r => {
            if (!r.path.startsWith('/')) {
                r.path = `/${r.path}`;
            }
            this.createRoute(r.model, r.path, r.middleware);
        });
    }
    static get logDir() {
        return this.rootPath ? `${this.rootPath}/logs` : './logs';
    }
    static get router() {
        return this._router;
    }
    static set rootPath(path) {
        this._root = path;
    }
    static addApis(...apis) {
        apis.forEach(Incore.addApi);
    }
    static addApi(api) {
        Incore.apisList.push(api);
    }
    static updateApi(id, ...keyValuePair) {
        this.apisList.map((api) => {
            if (api.id == id) {
                keyValuePair.forEach((keyValue) => {
                    api[keyValue.key] = keyValue.value;
                });
                return;
            }
        });
    }
    static get uploadsPathDate() {
        const date = new Date();
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }
    static uploadsBaseUrl(addPath) {
        var _a, _b;
        let baseUrl = (_b = (_a = Incore.config) === null || _a === void 0 ? void 0 : _a.uploads) === null || _b === void 0 ? void 0 : _b.baseUrl;
        if (!baseUrl) {
            throw new Error('Incore error: upload baseUrl not set!');
        }
        return (string_util_1.IncoreString.rtrim(baseUrl, '/') +
            '/uploads/' +
            (addPath ? `${addPath}/` : '') +
            this.uploadsPathDate);
    }
    static uploadsPath(addPath) {
        const uploads = Incore.config.uploads;
        if (!uploads || !uploads.path) {
            throw new Error('Incore error: upload path not set!');
        }
        let uploadPath = uploads.path;
        if (uploadPath.startsWith('./') || !uploadPath.startsWith('/')) {
            uploadPath = path.resolve(uploadPath);
        }
        return (string_util_1.IncoreString.rtrim(uploadPath, '/') +
            '/uploads/' +
            (addPath ? `${addPath}/` : '') +
            this.uploadsPathDate);
    }
    static async checkSecurityKey() {
        if (!this._securityKey) {
            const incoreTbl = await incore_tbl_1.IncoreTbl.query().first();
            if (!incoreTbl) {
                throw new Error('Incore table data not found!');
            }
            this._securityKey = buffer.Buffer.from(incoreTbl.id_secret, 'hex');
        }
    }
    static encrypt(data) {
        if (!data) {
            return null;
        }
        const algo = 'aes-256-cbc';
        const strData = `${data}`;
        if (this.isEncrypted(strData)) {
            return strData;
        }
        const vector = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algo, this.securityKey, vector);
        let encrypted = cipher.update(strData, 'utf-8', 'hex');
        encrypted += vector.toString('hex') + cipher.final('hex');
        return encrypted;
    }
    static encryptId(data, idColumn) {
        if (!this.encId) {
            return;
        }
        const algo = 'aes-256-cbc';
        let ids;
        if (Array.isArray(idColumn)) {
            ids = idColumn;
        }
        else {
            ids = [idColumn];
        }
        for (let id of ids) {
            if (id == 'metadata_id' && this.isMetadataIdEncrypted(data[id])) {
                continue;
            }
            if (data[id]) {
                data[id] = this.encrypt(data[id]);
            }
        }
    }
    static isMetadataIdEncrypted(metadataIdContent) {
        return !(0, type_validator_1.isNumber)(metadataIdContent);
    }
    static decrypt(data) {
        if (!this.encId) {
            return;
        }
        if (!data) {
            return null;
        }
        const strData = `${data}`;
        if (!this.isEncrypted(strData)) {
            return null;
        }
        const algo = 'aes-256-cbc';
        const ivStr = strData.substring(0, 32);
        const encryptedData = buffer.Buffer.from(strData.substring(32), 'hex');
        const vector = buffer.Buffer.from(ivStr, 'hex');
        const decipher = crypto.createDecipheriv(algo, this.securityKey, vector);
        let decrypted = decipher.update(encryptedData);
        decrypted = buffer.Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    static searchAndDecrypt(data) {
        if (!this.encId) {
            return;
        }
        if (Array.isArray(data)) {
            for (let x of data) {
                this.searchAndDecrypt(data[x]);
            }
            return;
        }
        for (let i in data) {
            if (Array.isArray(data[i]) || typeof data[i] === 'object') {
                this.searchAndDecrypt(data[i]);
                continue;
            }
            const characters = `${data[i]}`;
            if (this.isEncrypted(characters)) {
                const tryDecrypt = this.decrypt(characters);
                if ((0, type_validator_1.isNumber)(tryDecrypt)) {
                    data[i] = Number(tryDecrypt);
                }
                else {
                    data[i] = tryDecrypt;
                }
            }
        }
    }
    static searchAndEncrypt(data, idColumn) {
        if (!this.encId) {
            return;
        }
        const algo = 'aes-256-cbc';
        if (Array.isArray(data)) {
            for (let x of data) {
                this.searchAndEncrypt(data[x], idColumn);
            }
            return;
        }
        let ids;
        if (Array.isArray(idColumn)) {
            ids = idColumn;
        }
        else {
            ids = [idColumn];
        }
        for (let i in data) {
            if (Array.isArray(data[i]) || typeof data[i] === 'object') {
                this.searchAndEncrypt(data[i], idColumn);
                continue;
            }
            if (i == 'metadata_id' && this.isMetadataIdEncrypted(data[i])) {
                continue;
            }
            if (!ids.find(id => id === i)) {
                continue;
            }
            const characters = `${data[i]}`;
            if (!this.isEncrypted(characters) && data[i]) {
                if (data[i]) {
                    data[i] = this.encrypt(data[i]);
                }
            }
        }
    }
    static isEncrypted(data) {
        data = `${data}`;
        return ((data.length == 64 || data.length == 32) &&
            /^[0-9A-Fa-f]+$/g.test(data));
    }
    static get rootPath() {
        var _a;
        if (this._rootPath) {
            return this._rootPath;
        }
        let resolvedPath = path.resolve((_a = this._root) !== null && _a !== void 0 ? _a : './');
        let dir;
        if ((0, file_utils_1.fileExists)(`${resolvedPath}/package.json`)) {
            this._rootPath = string_util_1.IncoreString.rtrim(resolvedPath, '/');
            return this._rootPath;
        }
        dir = resolvedPath.replace(/\/(dist|app|lib|target|\.next|out|\.nuxt|\.vuepress\/dist)\/?/g, '');
        if ((0, file_utils_1.fileExists)(`${dir}/package.json`)) {
            this._rootPath = string_util_1.IncoreString.rtrim(dir, '/');
            return this._rootPath;
        }
        throw new Error('Incore could not determine the root path where package.json is placed, set manually Incore.rootPath = "...", if your main script is running in a folder called "my_api" at same place as package.json, just set Incore.rootPath = "../"');
    }
}
exports.Incore = Incore;
Incore._dataId = [];
Incore._routes = [];
Incore.apisList = [];
Incore._env = IncoreEnv.development;
