import { KeyValuePair } from '../interfaces/key-value-pair';
/**
 * @author Wercks de Oliveira
 *
 */
export declare abstract class IncoreEndpointsHelper {
    static createParamsAndQuery(theArgs: any[]): string;
    static searchParams(query: KeyValuePair[]): string;
}
