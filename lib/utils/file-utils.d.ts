/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare function filePutContents(path: string, fileName: string, data: any): void;
export declare function fileGetContents(path: string, fileName: string): string;
export declare function fileExists(path: string): boolean;
export declare function isDir(path: string): boolean;
export declare function mkdir(path: string, recursive?: boolean): string;
export declare function deleteFile(path: string): void;
export declare function requireUncached(module: any): Promise<any>;
