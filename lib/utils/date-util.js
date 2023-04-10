"use strict";
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMySqlDate = exports.toMySqlDateTime = void 0;
const toMySqlDateTime = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
exports.toMySqlDateTime = toMySqlDateTime;
const toMySqlDate = (date) => {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
};
exports.toMySqlDate = toMySqlDate;
