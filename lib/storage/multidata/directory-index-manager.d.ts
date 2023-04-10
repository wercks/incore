import { DirectoryIndex } from './directory-index';
import { DirectoryIndexInterface } from './directory-index-interface';
export declare abstract class DirectoryIndexManager implements DirectoryIndexInterface {
    private _rootPath;
    private _maxEntries;
    private _maxFilesPerDir;
    protected index: DirectoryIndex;
    protected useArrayIndexes: boolean;
    private _dirName;
    private _fileName;
    protected updateIndex(): void;
    set rootPath(root_path: string);
    set maxEntries(max_entries: number);
    set maxFilesPerDir(max_files: number);
    get rootPath(): string;
    get fullRootPath(): string;
    get fullPath(): string;
    protected get fullFilepath(): string;
    get fileName(): string;
    get dirName(): string;
    set fileName(name: string);
    set dirName(name: string);
    get currentFullPath(): string;
    protected get currentFullFilePath(): string;
    protected getInfo(loc_procedure?: boolean): any;
}
