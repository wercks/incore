"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const incore_model_1 = require("../core/incore-model");
const objection_1 = require("objection");
const address_1 = require("./address");
const media_1 = require("./media");
const profession_1 = require("./profession");
const metadata_1 = require("./metadata");
const incore_code_1 = require("../enum/incore-code");
const uniq_1 = require("../utils/uniq");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const user_role_1 = require("./user_role");
class User extends incore_model_1.IncoreModel {
    static get jsonSchema() {
        return {
            type: 'object',
            required: this.required(['name', 'email']),
            properties: this.properties({
                uid: { type: 'integer' },
                name: { type: 'string' },
                social_addr: { type: 'string' },
                trade_name: { type: 'string' },
                corporate_name: { type: 'string' },
                company_open_date: { type: 'string' /*, format: 'date'*/ },
                company_activity_code: { type: 'string' },
                company_legal_nature: { type: 'string' },
                company_capital: { type: 'integer' },
                birth_date: { type: 'string' /*, format: 'date'*/ },
                addr_id: { type: 'integer' },
                media_id: { type: 'integer' },
                phone_number: { type: 'string' },
                cpf: { type: 'string' },
                rg: { type: 'string' },
                cnpj: { type: 'string' },
                ein: { type: 'string' },
                ssn: { type: 'string' },
                profession_id: { type: 'integer' },
                professional_document_number: { type: 'string' },
                about: { type: 'string' },
                password: { type: 'string' },
                logged_at: { type: 'string' /*, format: 'date'*/ },
                type: { type: 'integer' },
                permission: { type: 'integer' },
                device_info: { type: 'string' },
                ip: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
            }),
        };
    }
    async exec() {
        switch (this.instructions().exec.action) {
            case 'getCode':
                return await this.getCode();
            case 'validateCode':
                return await this.validateCode();
            case 'updatePwd':
                return await this.updatePwd();
            case 'updatePwdApp':
                return await this.updatePwdApp();
        }
        return null;
    }
    async validateCode() {
        const Incore = await require('../config/incore');
        const token = this.instructions().exec.params.token;
        const code = this.instructions().exec.params.code;
        const codeData = (0, jsonwebtoken_1.verify)(token, Incore.auth.tokenSecretKey);
        if (!codeData || codeData.code !== code) {
            return {
                code: incore_code_1.IncoreResponseCode.UNPROCESSABLE_ENTITY,
                message: 'Código inválido!',
            };
        }
        return {
            code: incore_code_1.IncoreResponseCode.OK,
        };
    }
    async updatePwd() {
        const { password, id } = this.instructions();
        const currentUser = this.repository().request.user;
        if (!currentUser) {
            return {
                code: incore_code_1.IncoreResponseCode.ERROR,
                message: 'Usuário não encontrado!',
            };
        }
        if (!currentUser.roles ||
            !currentUser.roles.find(r => r.role.uniq_id == 'admin')) {
            return {
                code: incore_code_1.IncoreResponseCode.ERROR,
                message: 'Permissão negada!',
            };
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const affectedRows = await User.query().where('uid', id).update({
            password: hashedPassword,
        });
        if (!affectedRows) {
            return {
                code: incore_code_1.IncoreResponseCode.NOT_FOUND,
                message: 'Ocorreu um erro, a senha não foi alterada, tente novamente!',
            };
        }
        return {
            code: incore_code_1.IncoreResponseCode.OK,
        };
    }
    async updatePwdApp() {
        const token = this.instructions().exec.params.token;
        const pwd = this.instructions().exec.params.pwd;
        const code = this.instructions().exec.params.code;
        const Incore = await require('../config/incore');
        const codeData = (0, jsonwebtoken_1.verify)(token, Incore.auth.tokenSecretKey);
        if (!codeData || codeData.code !== code) {
            return {
                code: incore_code_1.IncoreResponseCode.NOT_FOUND,
                message: 'Dados inválidos!',
            };
        }
        const hashedPassword = await (0, bcrypt_1.hash)(pwd, 10);
        const affectedRows = await User.query()
            .where('uid', codeData.uid)
            .update({
            password: hashedPassword,
        });
        if (!affectedRows) {
            return {
                code: incore_code_1.IncoreResponseCode.NOT_FOUND,
                message: 'Ocorreu um erro, a senha não foi alterada, tente novamente!',
            };
        }
        return {
            code: incore_code_1.IncoreResponseCode.OK,
        };
    }
    async getCode() {
        const Incore = await require('../config/incore');
        const email = this.instructions().exec.params.email;
        const account = await User.query().where('email', email).first();
        if (!account) {
            return {
                code: incore_code_1.IncoreResponseCode.NOT_FOUND,
                message: 'Conta não encontrada para este email!',
            };
        }
        const code = (0, uniq_1.random)(6).substring(6);
        const dataInToken = {
            email: email,
            code: code,
            uid: account['uid'],
        };
        const expiresInSeconds = 60 * 60 * 24;
        const token = {
            data: (0, jsonwebtoken_1.sign)(dataInToken, Incore.auth.tokenSecretKey, {
                expiresIn: expiresInSeconds,
            }),
            expiresIn: expiresInSeconds,
        };
        return {
            item: account,
            code: incore_code_1.IncoreResponseCode.OK,
            token: token,
            message: '',
        };
    }
}
exports.User = User;
_a = User;
User.tableName = 'users';
User.idColumn = 'uid';
User.relationMappings = _a.rel({
    media: Object.assign({ modelClass: media_1.Media }, _a.mediaRelation()),
    addresses: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: address_1.Address,
        join: {
            from: 'users.addr_id',
            to: 'addresses.addr_id',
        },
    },
    roles: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: user_role_1.UserRole,
        join: {
            from: 'users.uid',
            to: 'user_roles.uid',
        },
    },
    professions: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: profession_1.Profession,
        join: {
            from: 'users.profession_id',
            to: 'professions.profession_id',
        },
    },
    metadata: {
        modelClass: metadata_1.Metadata,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `users.metadata_id`,
            to: 'metadata.related_to_id',
        },
    },
});
