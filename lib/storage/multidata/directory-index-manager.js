"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryIndexManager = void 0;
const file_utils_1 = require("../../utils/file-utils");
const incore_1 = require("../../config/incore");
const directory_index_1 = require("./directory-index");
const file_utils_2 = require("../../utils/file-utils");
class DirectoryIndexManager {
    constructor() {
        this._rootPath = null;
        this._maxEntries = 10;
        this._maxFilesPerDir = 5000;
        this.index = null;
        this.useArrayIndexes = true;
        this._dirName = null;
    }
    updateIndex() {
        this.index.incrementEntryNum();
        return this.index.saveIndexData();
    }
    set rootPath(root_path) {
        root_path = root_path.trim();
        const last = root_path.slice(-1);
        if (last !== '/') {
            root_path = `${root_path}/`;
        }
        this._rootPath = root_path;
    }
    set maxEntries(max_entries) {
        this._maxEntries = max_entries;
    }
    set maxFilesPerDir(max_files) {
        this._maxFilesPerDir = max_files;
    }
    get rootPath() {
        return this._rootPath;
    }
    get fullRootPath() {
        return incore_1.Incore.rootPath + this.rootPath;
    }
    get fullPath() {
        return this.fullRootPath + this.dirName + '/';
    }
    get fullFilepath() {
        return this.fullPath + this.fileName + '.json';
    }
    get fileName() {
        return this._fileName + '.json';
    }
    get dirName() {
        return this._dirName;
    }
    set fileName(name) {
        this._fileName = name;
    }
    set dirName(name) {
        this._dirName = name;
    }
    get currentFullPath() {
        return this.fullRootPath + this.index.get('current_dir_name') + '/';
    }
    get currentFullFilePath() {
        return (this.currentFullPath + this.index.get('current_file_name') + '.json');
    }
    async getInfo(loc_procedure = true) {
        if (this.rootPath === null) {
            throw new Error('Set root path!');
        }
        if (this.index === null) {
            this.index = new directory_index_1.DirectoryIndex(this);
        }
        if (loc_procedure && this.index.isLocked()) {
            await this.index.concurrentModificationPreventStart();
            this.index.clear();
            return this.getInfo(loc_procedure);
        }
        let info = this.index.getInfo();
        let update_index = false;
        if (info.entry_num >= this.maxEntries) {
            if (loc_procedure)
                this.index.lock();
            this.index.incrementFileNum();
            let file = this.currentFullFilePath;
            if (!(0, file_utils_1.fileExists)(file)) {
                (0, file_utils_2.filePutContents)(this.currentFullPath, this.index.get('current_file_name') + '.json', '{}');
            }
            update_index = true;
        }
        if (info.total_files >= this.maxFilesPerDir) {
            if (loc_procedure)
                this.index.lock();
            this.index.incrementDir();
            if (!(0, file_utils_1.fileExists)(this.currentFullPath)) {
                (0, file_utils_2.mkdir)(this.currentFullPath);
                (0, file_utils_2.filePutContents)(this.currentFullPath, this.index.get('current_file_name') + '.json', '{}');
            }
            update_index = true;
        }
        if (update_index) {
            this.index.saveIndexData();
            if (loc_procedure)
                this.index.unlock();
        }
        this.fileName = this.index.get('current_file_name');
        this.dirName = this.index.get('current_dir_name');
    }
}
exports.DirectoryIndexManager = DirectoryIndexManager;
