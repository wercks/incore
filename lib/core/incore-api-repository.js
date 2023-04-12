"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreApiRepository = void 0;
const file_utils_1 = require("../utils/file-utils");
const incore_status_1 = require("../enum/incore-status");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const incore_code_1 = require("../enum/incore-code");
const user_1 = require("../models/user");
const string_util_1 = require("../utils/string-util");
const incore_http_service_1 = require("./incore-http-service");
const metadata_1 = require("../models/metadata");
const crypto_1 = require("crypto");
const media_1 = require("../models/media");
const incore_1 = require("../config/incore");
const file_utils_2 = require("../utils/file-utils");
const role_1 = require("../models/role");
const user_role_1 = require("../models/user_role");
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class IncoreApiRepository {
    constructor(model) {
        this.ID = new Date().getTime();
        this._model = model;
        this._model.setRepository(this);
        this.setup();
    }
    set apiInstructions(instructions) {
        incore_1.Incore.searchAndDecrypt(instructions);
        this.instructions = instructions;
        if (!instructions.apiId) {
            this._model.setInstructions(instructions);
        }
    }
    get apiInstructions() {
        if (!this.instructions) {
            return {};
        }
        return this.instructions;
    }
    set request(r) {
        this.req = r;
    }
    get request() {
        return this.req;
    }
    get model() {
        return this._model;
    }
    setupHttpService() {
        var _a;
        this.httpService = new incore_http_service_1.IncoreHttpService();
        this.httpService.apiId = (_a = this.instructions.apiId) !== null && _a !== void 0 ? _a : '';
    }
    async readExternal() {
        this.setupHttpService();
        if (!this.instructions.path) {
            throw new Error('External path not found!');
        }
        return await this.httpService.get(this.instructions.path, this.instructions.params);
    }
    async updateExternal() {
        this.setupHttpService();
        if (!this.instructions.path) {
            throw new Error('External path not found!');
        }
        return await this.httpService.put(this.instructions.path, this.instructions.data);
    }
    async patchExternal() {
        this.setupHttpService();
        if (!this.instructions.path) {
            throw new Error('External path not found!');
        }
        return await this.httpService.patch(this.instructions.path, this.instructions.data);
    }
    async deleteExternal() {
        this.setupHttpService();
        if (!this.instructions.path) {
            throw new Error('External path not found!');
        }
        return await this.httpService.delete(this.instructions.path, this.instructions.data);
    }
    async createExternal() {
        this.setupHttpService();
        if (!this.instructions.path) {
            throw new Error('External path not found!');
        }
        return await this.httpService.post(this.instructions.path, this.instructions.data);
    }
    async read() {
        var _a, _b;
        if (this.instructions.storage) {
            let { path, name } = this.instructions.storage;
            if (!path.endsWith('/')) {
                path = `${path}/`;
            }
            if (!path.startsWith('/')) {
                path = `/${path}`;
            }
            const file = `${incore_1.Incore.rootPath}/app_data${path}${name}.json`;
            if (!(0, file_utils_1.fileExists)(file)) {
                return {
                    code: incore_code_1.IncoreResponseCode.NOT_FOUND,
                };
            }
            const data = await (0, file_utils_2.requireUncached)(file);
            if (!data) {
                return {
                    code: incore_code_1.IncoreResponseCode.NOT_FOUND,
                };
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                [this.instructions.first ? 'item' : 'items']: data,
                total: Array.isArray(data) ? data.length : 1,
            };
        }
        if (this.instructions.apiId) {
            const response = await this.readExternal();
            if (!response.ok) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    response: response,
                };
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                response: response,
            };
        }
        if (this.instructions.count) {
            this._model.conditions();
            this._model.currentQuery().count(`${this._model.idCol()} as total`);
            const countResult = (await this._model
                .currentQuery()
                .first());
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                total: countResult.total,
            };
        }
        if (this.instructions.id) {
            const findByIdResponse = this._model
                .statik()
                .query()
                .findById(this.instructions.id)
                .first();
            let findByIdResult;
            if (this.instructions.embed) {
                findByIdResult = await findByIdResponse.withGraphFetched(this.instructions.embed);
            }
            else {
                findByIdResult = await findByIdResponse;
            }
            return {
                item: findByIdResult,
                total: 1,
                code: incore_code_1.IncoreResponseCode.OK,
            };
        }
        if (this.instructions.search) {
            if (!Array.isArray(this.instructions.search.in)) {
                return {
                    message: 'Search instruction "in" must be an array of fields!',
                    code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                };
            }
            if (!this.instructions.search.term) {
                return {
                    message: 'Search term is required!',
                    code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                };
            }
            const words = this.instructions.search.term.split(' ');
            const IN = this.instructions.search.in;
            const addSearchCondition = (scope, field, w) => {
                let statusField;
                if (!field.includes('.')) {
                    field = `${this.model.tblName()}.${field}`;
                    statusField = `${this.model.tblName()}.status`;
                }
                else {
                    statusField = `${field.split('.').shift()}.status`;
                }
                scope
                    .where(field, 'like', '%' + w + '%')
                    .andWhere(statusField, incore_status_1.IncoreStatus.ACTIVE);
            };
            const query = this.model.statik().query();
            for (let field of IN) {
                query.orWhere(function () {
                    addSearchCondition(this, field, words[0]);
                });
            }
            query.orWhere(function () {
                const wordsCopy = [...words];
                wordsCopy.shift();
                wordsCopy.forEach((w) => {
                    for (let field of IN) {
                        this.orWhere(function () {
                            addSearchCondition(this, field, w);
                        });
                    }
                });
            });
            const result = await query.withGraphFetched((_a = this.instructions.embed) !== null && _a !== void 0 ? _a : '');
            const total = result.length;
            const page = (_b = this.instructions.page) !== null && _b !== void 0 ? _b : 1;
            const navigation = this.model.navigation(total, page);
            const items = result.slice((page - 1) * navigation.limit, navigation.limit * page);
            return {
                total: total,
                items: items,
                code: incore_code_1.IncoreResponseCode.OK,
                navigation: navigation,
            };
        }
        this._model.conditions();
        this._model.offsetLimitOrder();
        this._model.embed();
        return await this._model.result();
    }
    async patch() {
        if (!this.instructions.data) {
            return {
                code: incore_code_1.IncoreResponseCode.ERROR,
                message: 'The data is required!',
            };
        }
        if (this.instructions.apiId) {
            const response = await this.patchExternal();
            if (!response.ok) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    response: response,
                };
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                response: response,
            };
        }
        return this.update();
    }
    async update() {
        var _a, _b, _c, _d;
        if (!this.instructions.id) {
            return {
                code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                message: 'The "id" property in instruction is required!',
            };
        }
        if (!this.instructions.data) {
            return {
                code: incore_code_1.IncoreResponseCode.ERROR,
                message: 'The data is required!',
            };
        }
        if (this.instructions.apiId) {
            const response = await this.updateExternal();
            if (!response.ok) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    response: response,
                };
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                response: response,
            };
        }
        if (this.instructions.updatePassword) {
            const { current, confirm } = this.instructions.updatePassword;
            const pwdField = (_a = this.instructions.passwordField) !== null && _a !== void 0 ? _a : 'password';
            const password = this.instructions.data[pwdField];
            if (password !== confirm) {
                return {
                    code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                    message: 'As duas senha não são iguais!',
                };
            }
            const findById = (await this._model
                .statik()
                .query()
                .findById(this.instructions.id)
                .first());
            const isPasswordMatching = await (0, bcrypt_1.compare)(current, findById[pwdField !== null && pwdField !== void 0 ? pwdField : 'password']);
            if (!isPasswordMatching) {
                return {
                    code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                    message: 'A senha antiga não está correta!',
                };
            }
            const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
            this.instructions.data = Object.assign(Object.assign({}, this.instructions.data), { [pwdField]: hashedPassword });
        }
        else {
            const pwdField = (_b = this.instructions.passwordField) !== null && _b !== void 0 ? _b : 'password';
            const password = this.instructions.data[pwdField];
            if (password && `${password}`.length < 50) {
                const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
                this.instructions.data = Object.assign(Object.assign({}, this.instructions.data), { [pwdField]: hashedPassword });
            }
        }
        await this.handleCrypt();
        if (this.instructions.id) {
            this._model.embed();
            let data = await this._model
                .currentQuery()
                .updateAndFetchById(this.instructions.id, this.instructions.data);
            this._model.resetCurrentQuery();
            await this.handleMetadata(data.metadata_id);
            if (this.instructions.media) {
                const mediaAdded = await this.handleMedia(data.metadata_id);
                const dataMedia = (_c = data.media) !== null && _c !== void 0 ? _c : [];
                data = Object.assign(Object.assign({}, data), { media: [...dataMedia, ...mediaAdded] });
            }
            return {
                total: 1,
                item: data,
                code: incore_code_1.IncoreResponseCode.OK,
            };
        }
        this._model.conditions();
        this._model.embed();
        const instance = await this._model.currentQuery().first();
        this._model.resetCurrentQuery();
        let data = await instance
            .$query()
            .updateAndFetch(this.instructions.data);
        await this.handleMetadata(data.metadata_id);
        if (data.media) {
            const mediaAdded = await this.handleMedia(data.metadata_id);
            const dataMedia = (_d = data.media) !== null && _d !== void 0 ? _d : [];
            data = Object.assign(Object.assign({}, data), { media: [...dataMedia, ...mediaAdded] });
        }
        return {
            total: data.length,
            item: data,
            code: incore_code_1.IncoreResponseCode.OK,
        };
    }
    async handleCrypt() {
        if (this.instructions.crypt && Array.isArray(this.instructions.crypt)) {
            for (let c of this.instructions.crypt) {
                this.instructions.data[c] = await (0, bcrypt_1.hash)(this.instructions.data[c], 1);
            }
        }
    }
    async handleMedia(metadataId) {
        const decryptMdId = incore_1.Incore.decrypt(metadataId);
        if (metadataId) {
            metadataId = decryptMdId;
        }
        const media = this.instructions.media;
        const mediaArr = [];
        if (media && Array.isArray(media) && media.length) {
            for (let i = 0; i < media.length; i++) {
                const item = media[i];
                const response = await media_1.Media.query().insertAndFetch(Object.assign(Object.assign({}, item), { related_to: metadataId }));
                if (response) {
                    mediaArr.push(response);
                }
            }
        }
        return mediaArr;
    }
    // async next(
    //
    // ): Promise<IncoreApiResponse<T>> {
    //     if (!this.instructions.next) {
    //         return null
    //     }
    //     switch (this.instructions.next.action) {
    //         case 'CREATE':
    //             return await this.create(this.instructions.next)
    //         case 'UPDATE':
    //             return await this.update(this.instructions.next)
    //         case 'DELETE':
    //             return await this.del(this.instructions.next)
    //     }
    // }
    async upsert() {
        if (!this.instructions.conflict) {
            return {
                code: incore_code_1.IncoreResponseCode.BAD_REQUEST,
                message: `'conflict' must be sent!`,
            };
        }
        const instructions = Object.assign({}, this.instructions);
        const { conflict } = this.instructions;
        const query = this._model.statik().query();
        query.where('status', incore_status_1.IncoreStatus.ACTIVE);
        query.andWhere(function () {
            var _a;
            for (let q = 0; q < conflict.length; q++) {
                const check = conflict[q];
                this.andWhere(check.field, (_a = check.op) !== null && _a !== void 0 ? _a : '=', instructions.data[check.field]);
            }
        });
        const exists = await query.first();
        if (exists) {
            const idCol = this._model.idCol();
            this.apiInstructions = Object.assign(Object.assign({}, this.instructions), { id: exists[idCol] });
            return this.update();
        }
        // remove conflict porque "create" verifica cada campo separado
        this.apiInstructions = Object.assign(Object.assign({}, this.instructions), { conflict: undefined });
        return this.create();
    }
    async create() {
        var _a, _b, _c;
        if (this.instructions.storage) {
            if (!incore_1.Incore.rootPath) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    message: '"Incore.documentRoot" must be set!',
                };
            }
            let { path, name } = this.instructions.storage;
            if (!path.endsWith('/')) {
                path = `${path}/`;
            }
            if (!path.startsWith('/')) {
                path = `/${path}`;
            }
            try {
                (0, file_utils_1.filePutContents)(`${incore_1.Incore.rootPath}/app_data${path}`, `${name}.json`, JSON.stringify(this.instructions.data));
                return {
                    code: incore_code_1.IncoreResponseCode.OK,
                };
            }
            catch (e) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    message: JSON.stringify(e),
                };
            }
        }
        if (!this.instructions.data) {
            return {
                code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                message: 'The [data] is required!',
            };
        }
        if (this.instructions.apiId) {
            const response = await this.createExternal();
            if (!response.ok) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    response: response,
                };
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                response: response,
            };
        }
        if (this.instructions.conflict) {
            for (let q = 0; q < this.instructions.conflict.length; q++) {
                const check = this.instructions.conflict[q];
                const exists = await this._model
                    .statik()
                    .query()
                    .where(check.field, (_a = check.op) !== null && _a !== void 0 ? _a : '=', this.instructions.data[check.field])
                    .andWhere('status', '!=', incore_status_1.IncoreStatus.DELETED)
                    .first();
                if (exists) {
                    return {
                        code: incore_code_1.IncoreResponseCode.BAD_REQUEST,
                        message: (_b = check.message) !== null && _b !== void 0 ? _b : '',
                    };
                }
            }
        }
        await this.handleCrypt();
        if (this.model.tblName() == 'users') {
            const socialAddr = await this.createSocialAddr(this.instructions.data);
            this.instructions.data['social_addr'] = socialAddr;
            const pwdField = (_c = this.instructions.passwordField) !== null && _c !== void 0 ? _c : 'password';
            const password = this.instructions.data[pwdField];
            if (password && `${password}`.length < 50) {
                const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
                this.instructions.data = Object.assign(Object.assign({}, this.instructions.data), { [pwdField]: hashedPassword });
            }
        }
        this._model.embed();
        if (this._model.tblName() !== 'metadata') {
            this.instructions.data.metadata_id = this.createMetadataId();
        }
        this._model.currentQuery().insertAndFetch(this.instructions.data);
        const data = await this._model.currentQuery().first();
        this._model.resetCurrentQuery();
        await this.handleMetadata(data.metadata_id);
        await this.handleMedia(data.metadata_id);
        const idCol = this._model.idCol();
        if (typeof idCol === 'string') {
            const decrypt = incore_1.Incore.decrypt(data[idCol]);
            const id = decrypt ? decrypt : data[idCol];
            data.metadata = await this.getMetadata(id);
        }
        incore_1.Incore.searchAndEncrypt(data, incore_1.Incore.dataId);
        return {
            total: 1,
            item: data,
            code: incore_code_1.IncoreResponseCode.OK,
        };
    }
    async handleMetadata(metadataId) {
        const decrypt = incore_1.Incore.decrypt(metadataId);
        if (decrypt) {
            metadataId = decrypt;
        }
        if (this.instructions.metadata) {
            if (!Array.isArray(this.instructions.metadata)) {
                throw new Error('metadata instruction must be an array');
            }
            this.instructions.metadata.forEach(async (md) => {
                const data = {
                    related_to_id: metadataId,
                    name: md.name,
                    val: md.val,
                };
                const exists = await metadata_1.Metadata.query()
                    .where('related_to_id', metadataId)
                    .andWhere('status', '!=', incore_status_1.IncoreStatus.DELETED)
                    .andWhere('name', md.name)
                    .first();
                if (exists) {
                    await metadata_1.Metadata.query()
                        .where('related_to_id', metadataId)
                        .andWhere('status', '!=', incore_status_1.IncoreStatus.DELETED)
                        .andWhere('name', md.name)
                        .update(data);
                }
                else {
                    await metadata_1.Metadata.query().insert(data);
                }
            });
        }
    }
    async getMetadata(id) {
        const decrypt = incore_1.Incore.decrypt(id);
        if (decrypt) {
            id = decrypt;
        }
        const item = await this._model.statik().query().findById(id);
        if (!item) {
            return [];
        }
        const decryptMdId = incore_1.Incore.decrypt(item.metadata_id);
        if (decrypt) {
            item.metadata_id = decryptMdId;
        }
        return await metadata_1.Metadata.query()
            .where('related_to_id', item.metadata_id)
            .andWhere('status', '!=', incore_status_1.IncoreStatus.DELETED);
    }
    // private async getMedia(id: number): Promise<$Media[]> {
    //     const item = await this._model.query().findById(id)
    //     if (!item) {
    //         return []
    //     }
    //     return await Media.query()
    //         .where('related_to', item.metadata_id)
    //         .andWhere('status', '!=', IncoreStatus.DELETED)
    // }
    async signup() {
        var _a, _b, _c, _d, _e, _f;
        if (!this.instructions.data) {
            return {
                code: incore_code_1.IncoreResponseCode.ERROR,
                message: 'The data is required!',
            };
        }
        if (this.instructions.conflict) {
            for (let q = 0; q < this.instructions.conflict.length; q++) {
                const check = this.instructions.conflict[q];
                const exists = await this._model
                    .statik()
                    .query()
                    .where(check.field, (_a = check.op) !== null && _a !== void 0 ? _a : '=', this.instructions.data[check.field])
                    .andWhere('status', '!=', incore_status_1.IncoreStatus.DELETED)
                    .first();
                if (exists) {
                    return {
                        code: incore_code_1.IncoreResponseCode.BAD_REQUEST,
                        message: (_b = check.message) !== null && _b !== void 0 ? _b : '',
                    };
                }
            }
        }
        // social address
        const socialAddr = await this.createSocialAddr(this.instructions.data);
        const password = this.instructions.data[(_c = this.instructions.passwordField) !== null && _c !== void 0 ? _c : 'password'];
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const insertData = Object.assign(Object.assign({}, this.instructions.data), { [(_d = this.instructions.passwordField) !== null && _d !== void 0 ? _d : 'password']: hashedPassword, social_addr: socialAddr, metadata_id: this.createMetadataId() });
        this._model.currentQuery().insertAndFetch(insertData);
        this._model.embed();
        const user = await this._model.currentQuery();
        this._model.resetCurrentQuery();
        await this.handleMetadata(user.metadata_id);
        await this.handleMedia(user.metadata_id);
        user.metadata = await this.getMetadata(user.uid);
        const defaultRoles = (_f = (_e = incore_1.Incore.config) === null || _e === void 0 ? void 0 : _e.newUsersRoles) !== null && _f !== void 0 ? _f : 'users';
        const userRoles = await role_1.Role.query().whereIn('uniq_id', defaultRoles);
        if (userRoles) {
            user.roles = [];
            for (let userRole of userRoles) {
                if (userRole) {
                    const insert = await user_role_1.UserRole.query().insert({
                        uid: user.uid,
                        role_id: userRole.role_id,
                        metadata_id: (0, crypto_1.randomUUID)(),
                    });
                    insert.role = userRole;
                    user.roles.push(insert);
                }
            }
        }
        incore_1.Incore.searchAndEncrypt(user, incore_1.Incore.dataId);
        return {
            total: 1,
            item: user,
            code: incore_code_1.IncoreResponseCode.OK,
            token: this.createToken(user),
            refreshToken: this.createRefreshToken(user),
        };
    }
    createMetadataId() {
        return (0, crypto_1.randomUUID)();
    }
    async createSocialAddr(data, increment = 0) {
        var _a;
        if (this.model.tblName() != 'users') {
            return '';
        }
        let socialAddr = string_util_1.IncoreString.toSingleByte((_a = data.name) !== null && _a !== void 0 ? _a : data.corporate_name);
        socialAddr = string_util_1.IncoreString.crop(socialAddr, 3);
        socialAddr = `${socialAddr}${increment > 0 ? increment : ''}`;
        const capitalized = [];
        socialAddr.split(' ').forEach((word, i) => {
            if (i) {
                capitalized.push(word.charAt(0).toUpperCase() + word.substring(1));
            }
            else
                capitalized.push(word.toLocaleLowerCase());
        });
        socialAddr = capitalized.join('');
        const findByIdResult = await user_1.User.query()
            .where('social_addr', socialAddr)
            .first();
        if (findByIdResult) {
            return await this.createSocialAddr(data, ++increment);
        }
        return socialAddr;
    }
    async login() {
        var _a;
        const instructions = this.instructions;
        this._model.currentQuery().where(function () {
            if (instructions.loginFields) {
                instructions.loginFields.forEach(f => {
                    this.orWhere(f, instructions.login);
                });
            }
            else {
                this.andWhere('email', instructions.login);
            }
        });
        this._model.embed();
        let user = await this._model.currentQuery().first();
        this._model.resetCurrentQuery();
        if (!user) {
            return {
                code: incore_code_1.IncoreResponseCode.NOT_FOUND,
            };
        }
        const isPasswordMatching = await (0, bcrypt_1.compare)(this.instructions.password, user[(_a = this.instructions.passwordField) !== null && _a !== void 0 ? _a : 'password']);
        if (!isPasswordMatching) {
            return {
                code: incore_code_1.IncoreResponseCode.BAD_REQUEST,
            };
        }
        await this.handleMetadata(user.metadata_id);
        await this.handleMedia(user.metadata_id);
        if (this.instructions.metadata) {
            user.metadata = await this.getMetadata(user.uid);
        }
        return {
            item: user,
            code: incore_code_1.IncoreResponseCode.OK,
            token: this.createToken(user),
            refreshToken: this.createRefreshToken(user),
        };
    }
    async del() {
        if (!this.instructions.id) {
            return {
                code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                message: 'The "id" property in instruction is required!',
            };
        }
        if (this.instructions.apiId) {
            const response = await this.deleteExternal();
            if (!response.ok) {
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    response: response,
                };
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                response: response,
            };
        }
        if (this.instructions.id) {
            let idCol;
            if (typeof this._model.idCol() === 'object') {
                return {
                    total: 0,
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    message: 'The model has more the one id column, remove id and send it in where clause',
                };
            }
            else {
                idCol = this._model.idCol();
            }
            const number = await this._model
                .statik()
                .query()
                .where(idCol, this.instructions.id)
                .update({ status: incore_status_1.IncoreStatus.DELETED });
            return {
                total: number,
                code: incore_code_1.IncoreResponseCode.OK,
            };
        }
        this._model.conditions();
        const number = await this._model.currentQuery().delete();
        this._model.resetCurrentQuery();
        return {
            total: number,
            code: incore_code_1.IncoreResponseCode.OK,
        };
    }
    createToken(user) {
        const dataInToken = { uid: user.uid };
        return {
            data: (0, jsonwebtoken_1.sign)(dataInToken, incore_1.Incore.auth.tokenSecretKey, {
                expiresIn: incore_1.Incore.accessTokenExpiration,
                algorithm: incore_1.Incore.algorithm,
            }),
            expiresIn: incore_1.Incore.accessTokenExpiration,
        };
    }
    createRefreshToken(user) {
        const dataInToken = { uid: user.uid };
        return {
            data: (0, jsonwebtoken_1.sign)(dataInToken, incore_1.Incore.auth.refreshTokenSecretKey, {
                expiresIn: incore_1.Incore.refreshTokenExpiration,
                algorithm: incore_1.Incore.algorithm,
            }),
            expiresIn: incore_1.Incore.refreshTokenExpiration,
        };
    }
}
exports.IncoreApiRepository = IncoreApiRepository;
