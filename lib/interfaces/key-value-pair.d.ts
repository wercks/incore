/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export interface KeyValuePair {
    key: string;
    value: any;
}
export interface KeyValue<K> {
    key: keyof K;
    value: any;
}
