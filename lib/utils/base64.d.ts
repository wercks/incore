/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
declare const version = "3.7.5";
/**
 * polyfill version of `btoa`
 */
declare const btoaPolyfill: (bin: any) => string;
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
declare const _btoa: (bin: any) => string;
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
declare const fromUint8Array: (u8a: any, urlsafe?: boolean) => any;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
declare const utob: (u: any) => any;
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
declare const encode: (src: any, urlsafe?: boolean) => any;
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
declare const encodeURI: (src: any) => any;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
declare const btou: (b: any) => any;
/**
 * polyfill version of `atob`
 */
declare const atobPolyfill: (asc: any) => string;
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
declare const _atob: (asc: any) => string;
/**
 * converts a Base64 string to a Uint8Array.
 */
declare const toUint8Array: (a: any) => any;
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
declare const decode: (src: any) => any;
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
 */
declare const isValid: (src: any) => boolean;
/**
 * extend String.prototype with relevant methods
 */
declare const extendString: () => void;
/**
 * extend Uint8Array.prototype with relevant methods
 */
declare const extendUint8Array: () => void;
/**
 * extend Builtin prototypes with relevant methods
 */
declare const extendBuiltins: () => void;
declare const gBase64: {
    version: string;
    atob: (asc: any) => string;
    atobPolyfill: (asc: any) => string;
    btoa: (bin: any) => string;
    btoaPolyfill: (bin: any) => string;
    fromBase64: (src: any) => any;
    toBase64: (src: any, urlsafe?: boolean) => any;
    encode: (src: any, urlsafe?: boolean) => any;
    encodeURI: (src: any) => any;
    encodeURL: (src: any) => any;
    utob: (u: any) => any;
    btou: (b: any) => any;
    decode: (src: any) => any;
    isValid: (src: any) => boolean;
    fromUint8Array: (u8a: any, urlsafe?: boolean) => any;
    toUint8Array: (a: any) => any;
    extendString: () => void;
    extendUint8Array: () => void;
    extendBuiltins: () => void;
};
export { version };
export { _atob as atob };
export { atobPolyfill };
export { _btoa as btoa };
export { btoaPolyfill };
export { decode as fromBase64 };
export { encode as toBase64 };
export { utob };
export { encode };
export { encodeURI };
export { encodeURI as encodeURL };
export { btou };
export { decode };
export { isValid };
export { fromUint8Array };
export { toUint8Array };
export { extendString };
export { extendUint8Array };
export { extendBuiltins };
export { gBase64 as Base64 };
