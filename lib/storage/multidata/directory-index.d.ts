import { StdClass } from '../../core/std-class';
import { DirectoryIndexManager } from './directory-index-manager';
export declare class DirectoryIndex {
    private info;
    private path;
    private rootPath;
    private name;
    constructor(manager: DirectoryIndexManager);
    incrementFileNum(): void;
    incrementTotalFiles(): void;
    incrementDir(): void;
    incrementEntryNum(): void;
    setInfo(key: string, value: any): void;
    concurrentModificationPreventStart(): Promise<void>;
    isLocked(): boolean;
    lock(): void;
    unlock(): void;
    private get lockFile();
    saveIndexData(): void;
    get(name: string, return_value?: any): any;
    clear(): void;
    getInfo(): StdClass;
    private createFirstFile;
}
