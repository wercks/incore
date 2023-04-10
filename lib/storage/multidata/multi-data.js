"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiData = void 0;
const file_utils_1 = require("../../utils/file-utils");
const directory_index_manager_1 = require("./directory-index-manager");
const no_results_found_exception_1 = require("../../exceptions/no-results-found-exception");
const string_util_1 = require("../../utils/string-util");
class MultiData extends directory_index_manager_1.DirectoryIndexManager {
    constructor(root_path = 'multidata/data', max_entries = 100) {
        super();
        this.id = null;
        this.multiData = {};
        this.rootPath = root_path;
        this.maxEntries = max_entries;
        this.getInfo();
    }
    restart() {
        this.dirName = null;
        this.fileName = null;
        this.multiData = {};
        this.getInfo();
    }
    remove() {
        const md = this.getMultiData();
        if (!md || !this.exists()) {
            return false;
        }
        this.multiData[this.id] = 0;
        return true;
    }
    get() {
        const md = this.getMultiData();
        if (!md || !this.exists()) {
            return null;
        }
        return this.multiData[this.id];
    }
    async add(data, moreInfo) {
        this.index.clear();
        await this.index.concurrentModificationPreventStart();
        if (this.index.isLocked()) {
            return this.add(data, moreInfo);
        }
        this.getInfo();
        this.index.lock();
        const md = this.getMultiData();
        if (!md) {
            this.index.unlock();
            throw new no_results_found_exception_1.NoResultsFoundException('Documento não encontrado!');
        }
        this.id = this.index.get('entry_num');
        this.multiData[this.id] = data;
        this.saveMultiData();
        let info = {
            root_path: this.index.get('root_path'),
            dir: this.index.get('current_dir_name'),
            file: this.index.get('current_file_name'),
            id: this.id,
        };
        this.updateIndex();
        if (moreInfo) {
            info = Object.assign(Object.assign({}, info), moreInfo);
        }
        this.index.unlock();
        return info;
    }
    update(key, value) {
        const md = this.getMultiData();
        if (!md || !this.exists()) {
            return false;
        }
        this.multiData[this.id][key] = value;
        return this.saveMultiData();
    }
    saveMultiData() {
        (0, file_utils_1.filePutContents)(this.fullPath, this.fileName, JSON.stringify(this.multiData));
    }
    exists() {
        return this.id in this.multiData;
    }
    getMultiData() {
        const path = this.fullPath;
        if (!(0, file_utils_1.fileExists)(path + this.fileName)) {
            this.multiData = {};
            this.saveMultiData();
        }
        else {
            try {
                const contents = (0, file_utils_1.fileGetContents)(path, this.fileName);
                this.multiData = JSON.parse(contents);
            }
            catch (e) { }
        }
        return this.multiData;
    }
    createURL(info) {
        return (string_util_1.IncoreString.rtrim(info.root_path, '/').replace('/', '-') +
            '.' +
            info.dir +
            '-' +
            info.file +
            '-' +
            info.id);
    }
    decodeURL(data) {
        const info = data.split('.');
        const last = info[info.length - 1];
        const image_info = last.split('-');
        return {
            root_path: info[0].replace('-', '/') + '/',
            dir: image_info[0],
            file: image_info[1],
            id: image_info[2] + 0,
        };
    }
    decodeUrlAndSetInfo(data) {
        const info = this.decodeURL(data);
        this.id = info['id'];
        this.rootPath = info['root_path'];
        this.dirName = info['dir'];
        this.fileName = info['file'];
    }
    clean() {
        this.multiData = {};
    }
    getId() {
        return this.id;
    }
}
exports.MultiData = MultiData;
