"use strict";
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBool = exports.isArray = exports.isObject = exports.isBool = exports.isNumber = exports.isString = void 0;
const isString = (data) => {
    return typeof data === 'string';
};
exports.isString = isString;
const isNumber = (data) => {
    return !isNaN(Number(data));
};
exports.isNumber = isNumber;
const isBool = (data) => {
    return typeof data === 'boolean';
};
exports.isBool = isBool;
const isObject = (data) => {
    return typeof data === 'object';
};
exports.isObject = isObject;
const isArray = (data) => {
    return Array.isArray(data);
};
exports.isArray = isArray;
const toBool = (value) => {
    if (value === null || value === undefined) {
        return false;
    }
    switch (value) {
        case '1':
        case 1:
        case 'on':
        case 'ON':
        case 'YES':
        case 'Yes':
        case 'Y':
        case 'true':
        case 'TRUE':
        case true:
            return true;
    }
    return false;
};
exports.toBool = toBool;
