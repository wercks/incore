import { FileManager } from './file-manager';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare class AbstractFile {
    private _filename;
    private _path;
    private _absolutePath;
    protected _contents: string;
    readonly BUFFER_SIZE = 1024;
    protected fileManager: FileManager;
    protected handle: any;
    private _exists;
    NOT_EXISTS: number;
    CANNOT_OPEN: number;
    CANNOT_WRITE: number;
    protected cause: number;
    constructor(path?: string, name?: string);
    getCause(): number;
    get exists(): boolean;
    get contents(): string;
    set contents(contents: string);
    cleanExists(): void;
    get absolutePath(): string;
    set path(pathname: string);
    set filename(name: string);
    getFilename(): string;
    getPathname(): string;
    resetFilename(): void;
    resetPathname(): void;
    reset(): void;
}
