"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreString = void 0;
const incore_entity_1 = require("./incore-entity");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
var IncoreString;
(function (IncoreString) {
    IncoreString.incrementLetter = (letter) => {
        let next = '';
        letter.split('').forEach(l => {
            next += String.fromCharCode(l.charCodeAt(0) + 1);
        });
        return next;
    };
    IncoreString.trim = (content, charlist = '') => {
        content = content.trim();
        const list = (' \n\r\t\u000b' + charlist).split('');
        const regexpSpecialChars = /([\[\]\^\$\|\(\)\\\+\*\?\{\}\=\!])/gi;
        for (let i = 0; i < list.length; i++) {
            let chr = list[i];
            chr = chr.replace(regexpSpecialChars, '\\$1');
            const regExp = new RegExp('^(' + chr + ')$', 'g');
            content = `${content}`.replace(regExp, '');
        }
        return content;
    };
    IncoreString.rtrim = (content, charlist = '') => {
        const list = (' \n\r\t\u000b' + charlist).split('');
        const regexpSpecialChars = /([\[\]\^\$\|\(\)\\\+\*\?\{\}\=\!])/gi;
        for (let i = 0; i < list.length; i++) {
            let chr = list[i];
            chr = chr.replace(regexpSpecialChars, '\\$1');
            const regExp = new RegExp('(' + chr + ')$', 'g');
            content = `${content}`.replace(regExp, '');
        }
        return content;
    };
    IncoreString.ltrim = (content, charlist = '') => {
        const list = (' \n\r\t\u000b' + charlist).split('');
        const regexpSpecialChars = /([\[\]\^\$\|\(\)\\\+\*\?\{\}\=\!])/gi;
        for (let i = 0; i < list.length; i++) {
            let chr = list[i];
            chr = chr.replace(regexpSpecialChars, '\\$1');
            const regExp = new RegExp('^(' + chr + ')', 'g');
            content = `${content}`.replace(regExp, '');
        }
        return content;
    };
    IncoreString.crop = (content, limit, ignoreWordsLength = 0, maxChars = 3) => {
        let count = 0;
        let strCropped = '';
        const split = incore_entity_1.IncoreEntity.decode(content).split(' ');
        for (let word of split) {
            if (count == limit) {
                break;
            }
            if (ignoreWordsLength) {
                if (word.length > ignoreWordsLength) {
                    strCropped += ' ' + word;
                }
            }
            else {
                strCropped += ' ' + word;
            }
            if (word.length >= maxChars) {
                count++;
            }
        }
        content = strCropped;
        return IncoreString.trim(content);
    };
    IncoreString.isEmpty = (content) => {
        content = IncoreString.trim(content);
        return !content.length;
    };
    IncoreString.toSingleByte = (content) => {
        const multiByteChars = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿRr';
        const singleByteChars = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
        for (let i = 0; i < singleByteChars.length; i++) {
            const chr = {
                key: multiByteChars.charAt(i),
                value: singleByteChars.charAt(i),
            };
            content = content.replace(chr.key, chr.value);
        }
        return content;
    };
})(IncoreString = exports.IncoreString || (exports.IncoreString = {}));
