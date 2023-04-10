"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreModel = void 0;
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
const objection_1 = require("objection");
const date_util_1 = require("../utils/date-util");
const incore_status_1 = require("../enum/incore-status");
const incore_pagination_1 = require("../utils/incore-pagination");
const incore_code_1 = require("../enum/incore-code");
const string_util_1 = require("../utils/string-util");
const __1 = require("../");
class IncoreModel extends objection_1.Model {
    handleAction(action) {
        return false;
    }
    image(index, returnValue = null) {
        if (!this['media']) {
            return returnValue;
        }
        if (!Array.isArray(this['media'])) {
            return returnValue;
        }
        if (!this['media'].length) {
            return returnValue;
        }
        if (index === 'last' || index === 'first') {
            if (index == 'first') {
                return this['media'][0].url;
            }
            else {
                return this['media'][this['media'].length - 1].url;
            }
        }
        return this['media'][index].url;
    }
    lastImage(returnValue = null) {
        return this.image('last', returnValue);
    }
    imageByName(name, returnFirst = true, returnLast = false) {
        if (!this['media']) {
            return null;
        }
        if (!Array.isArray(this['media'])) {
            return null;
        }
        if (!this['media'].length) {
            return null;
        }
        const filter = this['media'].filter(m => m.url.includes(name));
        let image;
        if (filter.length) {
            image = filter[filter.length - 1];
        }
        if (!image) {
            if (returnFirst) {
                return this.firstImage();
            }
            else if (returnLast) {
                return this.lastImage();
            }
            else {
                return null;
            }
        }
        return image.url;
    }
    firstImage(returnValue = null) {
        return this.image('first', returnValue);
    }
    md(name, returnValue = null) {
        var _a;
        if (!Array.isArray(this['metadata'])) {
            return returnValue;
        }
        const metadata = (_a = this['metadata']) === null || _a === void 0 ? void 0 : _a.find(m => m.name === name);
        if (!metadata) {
            return returnValue;
        }
        const val = metadata.val;
        if (val === 'false' || val === 'true') {
            return val === 'true';
        }
        if (isNaN(Number(val))) {
            return val;
        }
        return Number(val);
    }
    ipAddr() {
        // let ip: string
        var _a, _b;
        // const ips: any[] = []
        // const remoteAddress = this.repository().request.socket.remoteAddress
        // if (remoteAddress) {
        //     ips.push(remoteAddress)
        // }
        // const xForwardedFor =
        //     this.repository().request.header('x-forwarded-for')
        // if (xForwardedFor) {
        //     const list = xForwardedFor.split(',')
        //     list.forEach(i => {
        //         ips.push(i)
        //     })
        // }
        // ips.every(ipAddr => {
        //     if (net.isIP(ipAddr)) {
        //         ip = ipAddr
        //         return false
        //     }
        // })
        // return ip
        const clientIP = (_b = (_a = this.repository()
            .request.header('x-forwarded-for')) === null || _a === void 0 ? void 0 : _a.split(',').shift()) !== null && _b !== void 0 ? _b : this.repository().request.socket.remoteAddress;
        return clientIP;
    }
    handle(action) {
        var _a, _b;
        return (this.handleAction(action) ||
            (((_a = this.instructions()) === null || _a === void 0 ? void 0 : _a.exec) !== undefined &&
                ((_b = this.instructions()) === null || _b === void 0 ? void 0 : _b.exec) !== null));
    }
    setRepository(repository) {
        this._repository = repository;
    }
    repository() {
        return this._repository;
    }
    statik() {
        return this.constructor;
    }
    $this() {
        return this.constructor;
    }
    instructions() {
        return this._instructions;
    }
    tblName() {
        return this.statik().tableName;
    }
    idCol() {
        return this.statik().idColumn;
    }
    setInstructions(data) {
        this._instructions = data;
    }
    useLimitInFirst() {
        return true;
    }
    static rel(data) {
        return data;
    }
    static metadataRelation() {
        return {
            relation: objection_1.Model.HasManyRelation,
            join: {
                from: `${this.tableName}.metadata_id`,
                to: 'metadata.related_to_id',
            },
        };
    }
    static mediaRelation() {
        return {
            relation: objection_1.Model.HasManyRelation,
            join: {
                from: `${this.tableName}.metadata_id`,
                to: 'media.related_to',
            },
        };
    }
    currentQuery() {
        if (!this.queryInstance) {
            this.queryInstance = this.statik().query();
        }
        return this.queryInstance;
    }
    resetCurrentQuery() {
        this.queryInstance = null;
    }
    showCurrentQuery() {
        console.log(this.currentQuery().toKnexQuery().toSQL().toNative());
    }
    async result(total = null) {
        let result;
        if (this.instructions().first) {
            result = await this.currentQuery().first();
        }
        else {
            result = await this.currentQuery();
        }
        let countResult = { total: total !== null && total !== void 0 ? total : 0 };
        const runCount = !this.instructions().first && !this.instructions().id;
        if (total === null && runCount) {
            const query = this.statik().query();
            query.count(`${this.statik().idColumn} as total`);
            this.conditions(query);
            const totalResult = await query.first();
            countResult.total = totalResult.total;
        }
        else if (result) {
            countResult.total = 1;
        }
        const itemOrItems = this.instructions()
            .first
            ? 'item'
            : 'items';
        this.resetCurrentQuery();
        return {
            total: countResult.total,
            [itemOrItems]: result,
            code: incore_code_1.IncoreResponseCode.OK,
            navigation: this.navigation(countResult.total, this.instructions().page),
        };
    }
    navigation(total, page) {
        var _a, _b, _c;
        page = page !== null && page !== void 0 ? page : 1;
        const totalPages = (_a = this.instructions().totalPages) !== null && _a !== void 0 ? _a : 5;
        const limit = (_b = this.instructions().limit) !== null && _b !== void 0 ? _b : 10;
        const offset = (_c = this.instructions().offset) !== null && _c !== void 0 ? _c : 0;
        const pagination = new incore_pagination_1.IncorePagination(total, page, totalPages, limit);
        const nextOffset = pagination.getCurrentPageNumber * limit;
        return {
            page: pagination.getCurrentPageNumber,
            next: pagination.next,
            prev: pagination.previous,
            pages: pagination.pages,
            first: pagination.getCurrentPageNumber === 1,
            end: offset + limit >= total,
            offset: nextOffset,
            limit: limit,
        };
    }
    embed() {
        if (this.instructions().embed) {
            this.currentQuery().withGraphFetched(this.getEmbedData());
        }
    }
    getEmbedData() {
        if (this.instructions().embed) {
            let embed = this.instructions().embed.trim();
            if (embed.startsWith('[')) {
                embed = string_util_1.IncoreString.rtrim(embed, ']');
                embed = `${embed}, metadata]`;
            }
            else {
                embed = `[${embed}, metadata]`;
            }
            return embed;
        }
        return null;
    }
    offsetLimitOrder() {
        const tb = this.statik().tableName;
        if (this.instructions().offset) {
            this.currentQuery().offset(this.instructions().offset);
        }
        if (this.instructions().limit) {
            this.currentQuery().limit(this.instructions().limit);
        }
        if (this.instructions().order) {
            this.currentQuery().orderBy(`${tb}.${this.instructions().order.by}`, this.instructions().order.dir);
        }
    }
    conditions(queryInstance) {
        const tb = this.statik().tableName;
        const query = queryInstance !== null && queryInstance !== void 0 ? queryInstance : this.currentQuery();
        if (this.instructions().filters && this.instructions().filters.length) {
            const where = this.instructions().filters[0];
            const or = this.instructions().filters.length > 1
                ? this.instructions().filters[1]
                : null;
            const createConditions = (method, instruction) => {
                let statusConditionAdded = false;
                query[method](function () {
                    instruction.forEach(instruction => {
                        let col = instruction[0];
                        if (!col.includes('.')) {
                            col = `${tb}.${col}`;
                        }
                        const op = instruction.length > 2 ? instruction[1] : '=';
                        const val = instruction.length > 2
                            ? instruction[2]
                            : instruction[1];
                        this.andWhere(col, op, val);
                        if (!statusConditionAdded) {
                            const hasStatusInCondition = where.find(where => where[0] == 'status');
                            if (!hasStatusInCondition) {
                                if (!statusConditionAdded) {
                                    this.andWhere(`${tb}.status`, '!=', incore_status_1.IncoreStatus.DELETED);
                                }
                            }
                            statusConditionAdded = true;
                        }
                    });
                });
            };
            createConditions('andWhere', where);
            or && createConditions('orWhere', or);
        }
        else {
            query.andWhere(`${tb}.status`, '!=', incore_status_1.IncoreStatus.DELETED);
        }
    }
    async exec() {
        throw new Error('Exec method must be implemented by original model!');
    }
    // $validate(json?: Pojo, opt?: ModelOptions): Pojo {
    //     return json
    // }
    $beforeValidate(jsonSchema, json, opt) {
        // recreates to reassign properties already set before model instructions set
        return IncoreModel.jsonSchema;
    }
    static required(data) {
        // if (!this.instructions) {
        //     return data
        // }
        // if (
        //     this.instructions().action === 'UPDATE' ||
        //     this.instructions().action === 'UPSERT'
        // ) {
        //     return []
        // }
        // return data
        // temporário
        return [];
    }
    static properties(data) {
        data.created_at = {
            type: 'string',
        };
        data.updated_at = {
            type: 'string',
        };
        data.metadata_id = {
            type: 'string',
        };
        data.status = {
            type: 'number',
        };
        return data;
    }
    $beforeInsert(queryContext) {
        __1.Incore.searchAndDecrypt(this);
        this.created_at = (0, date_util_1.toMySqlDateTime)(new Date());
        this.updated_at = this.created_at;
        this.$validate();
        this.sanitize();
    }
    $beforeUpdate(opt, queryContext) {
        __1.Incore.searchAndDecrypt(this);
        this.updated_at = (0, date_util_1.toMySqlDateTime)(new Date());
        this.$validate();
        this.sanitize();
    }
    $beforeDelete(queryContext) {
        __1.Incore.searchAndDecrypt(this);
    }
    async $afterFind(queryContext) {
        var _a;
        if (this.tblName() === 'incore') {
            return;
        }
        await __1.Incore.checkSecurityKey();
        const ids = (_a = __1.Incore.dataId) !== null && _a !== void 0 ? _a : [];
        const thisIdCol = this.idCol();
        if (Array.isArray(thisIdCol)) {
            thisIdCol.forEach(tic => {
                if (!ids.includes(tic)) {
                    ids.push(tic);
                }
            });
        }
        else if (!ids.includes(thisIdCol)) {
            ids.push(thisIdCol);
        }
        __1.Incore.encryptId(this, ids);
    }
    sanitize() {
        if (this['cpf']) {
            this['cpf'] = this['cpf'].replace(/[^0-9]+/g, '');
        }
        if (this['cnpj']) {
            this['cnpj'] = this['cnpj'].replace(/[^0-9]+/g, '');
        }
    }
}
exports.IncoreModel = IncoreModel;
