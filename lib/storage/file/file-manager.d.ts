import { AbstractFile } from './abstract-file';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare class FileManager extends AbstractFile {
    constructor(path?: string, name?: string, createFiles?: boolean);
    createFile(withContent?: string): void;
    createDirs(): boolean;
}
