export declare class IncoreAuthException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string);
}
