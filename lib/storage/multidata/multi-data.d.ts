import { StdClass } from '../../core/std-class';
import { DirectoryIndexManager } from './directory-index-manager';
export declare class MultiData extends DirectoryIndexManager {
    protected id: any;
    protected multiData: StdClass;
    constructor(root_path?: string, max_entries?: number);
    restart(): void;
    remove(): boolean;
    get(): any;
    add(data: any, moreInfo: StdClass): any;
    update(key: string, value: any): false | void;
    saveMultiData(): void;
    exists(): boolean;
    getMultiData(): StdClass;
    createURL(info: StdClass): string;
    decodeURL(data: string): StdClass;
    decodeUrlAndSetInfo(data: any): void;
    clean(): void;
    getId(): any;
}
