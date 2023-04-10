import { IncoreState } from '../enum/incore-state';
export declare class RequestStateManager {
    private static states;
    private static checkState;
    static setState(name: string, requestState: IncoreState): void;
    static state(name?: string): IncoreState | null;
    static setStateLoading(name?: string): void;
    static setStateIdle(name?: string): void;
    static setStateError(name?: string): void;
    static setStateSuccess(name?: string): void;
    static loading(name?: string): boolean;
    static idle(name?: string): boolean;
    static error(name?: string): boolean;
    static success(name?: string): boolean;
}
