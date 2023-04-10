"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreEndpointsHelper = void 0;
/**
 * @author Wercks de Oliveira
 *
 */
class IncoreEndpointsHelper {
    static createParamsAndQuery(theArgs) {
        const params = theArgs.length ? theArgs[0] : [];
        const query = theArgs.length && theArgs[1] ? theArgs[1] : [];
        let data = '';
        if (params.length) {
            params.forEach(arg => {
                if (arg.trim()) {
                    data += `/${arg}`;
                }
            });
        }
        if (query.length) {
            const searchParams = this.searchParams(query);
            if (searchParams) {
                data += '?' + searchParams;
            }
        }
        return data;
    }
    static searchParams(query) {
        const searchParams = new URLSearchParams();
        query.forEach(kv => searchParams.set(kv.key, kv.value));
        return searchParams.toString();
    }
}
exports.IncoreEndpointsHelper = IncoreEndpointsHelper;
