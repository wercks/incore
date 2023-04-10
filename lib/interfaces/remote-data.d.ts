/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export interface RemoteData<T> {
    id: string | number;
    data: T;
    /**
     * {key: value}
     */
    params: any;
    path: string;
}
