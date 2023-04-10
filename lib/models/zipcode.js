"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipCode = void 0;
const incore_code_1 = require("../enum/incore-code");
const incore_model_1 = require("../core/incore-model");
const country_state_1 = require("./country-state");
const city_1 = require("./city");
const node_fetch_1 = require("node-fetch");
class ZipCode extends incore_model_1.IncoreModel {
    async exec() {
        switch (this.instructions().exec.action) {
            case 'zipcode':
                return this.findAddr();
        }
        return null;
    }
    async findAddr() {
        var _a;
        try {
            const zipcode = this.instructions().exec.params.zipcode;
            const url = `https://viacep.com.br/ws/${zipcode.replace(/\D+/g, '')}/json/`;
            const response = await (0, node_fetch_1.default)(url);
            const address = (await response.json());
            if (address.erro) {
                console.error(JSON.stringify(address));
                return {
                    code: incore_code_1.IncoreResponseCode.ERROR,
                    message: address.erro,
                };
            }
            let findCity;
            const findState = await country_state_1.CountryState.query()
                .where('code', address.uf.toUpperCase())
                .first();
            if (findState) {
                findCity = (await city_1.City.query()
                    .where('country_state_id', findState.country_state_id)
                    .andWhere('name', address.localidade)
                    .first());
            }
            return {
                code: incore_code_1.IncoreResponseCode.OK,
                item: {
                    state: findState,
                    city: findCity,
                    address: address,
                },
            };
        }
        catch (e) {
            console.error(JSON.stringify(e));
            return {
                code: incore_code_1.IncoreResponseCode.ERROR,
                message: (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : 'Ocorreu um erro!',
            };
        }
    }
}
exports.ZipCode = ZipCode;
ZipCode.tableName = 'countries';
ZipCode.idColumn = 'country_id';
