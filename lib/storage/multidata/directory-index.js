"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryIndex = void 0;
const reader_1 = require("../file/reader");
const writer_1 = require("../file/writer");
const math_utils_1 = require("../../utils/math-utils");
const string_util_1 = require("../../utils/string-util");
const fs = require("fs");
class DirectoryIndex {
    constructor(manager) {
        this.path = null;
        this.rootPath = null;
        this.name = 'index.json';
        this.path = manager.fullRootPath;
        this.path = string_util_1.IncoreString.rtrim(this.path, '/') + '/';
        this.rootPath = manager.rootPath;
        manager = null;
    }
    incrementFileNum() {
        let current_file_name = this.get('current_file_name');
        this.setInfo('current_file_name', ++current_file_name);
        this.setInfo('entry_num', 0);
        this.incrementTotalFiles();
    }
    incrementTotalFiles() {
        let total_files = this.get('total_files');
        this.setInfo('total_files', ++total_files);
    }
    incrementDir() {
        let current_dir_name = this.get('current_dir_name');
        this.setInfo('current_dir_name', string_util_1.IncoreString.incrementLetter(current_dir_name));
        this.setInfo('current_file_name', 1);
        this.setInfo('entry_num', 0);
        this.setInfo('total_files', 1);
    }
    incrementEntryNum() {
        let entry_num = this.get('entry_num');
        this.setInfo('entry_num', ++entry_num);
    }
    setInfo(key, value) {
        this.info[key] = value;
    }
    async concurrentModificationPreventStart() {
        // Espera um tempo aleatório,
        // para que o arquivo .locked seja verificado separadamente
        const milles = (0, math_utils_1.mt_rand)(20, 300);
        await new Promise(r => setTimeout(r, milles * 1000));
    }
    isLocked() {
        return fs.existsSync(this.lockFile);
    }
    lock() {
        const writer = new writer_1.Writer(this.path, 'index.locked');
        writer.contents = ';';
        writer.write();
    }
    unlock() {
        fs.rmSync(this.lockFile);
    }
    get lockFile() {
        return this.path + 'index.locked';
    }
    saveIndexData() {
        const writer = new writer_1.Writer(this.path, this.name);
        writer.contents = JSON.stringify(this.info);
        return writer.write();
    }
    get(name, return_value = null) {
        var _a;
        return (_a = this.info[name]) !== null && _a !== void 0 ? _a : return_value;
    }
    clear() {
        this.info = [];
    }
    getInfo() {
        if (this.info) {
            return this.info;
        }
        let data;
        if (!fs.existsSync(this.path + this.name)) {
            data = {
                current_file_name: 1,
                entry_num: 0,
                current_dir_name: 'a',
                root_path: this.rootPath,
                total_files: 1,
            };
            if (!fs.existsSync(this.path + 'a')) {
                fs.mkdirSync(this.path + 'a');
                this.createFirstFile('a');
            }
            else if (!fs.existsSync(this.path + 'a/1.json')) {
                this.createFirstFile('a');
            }
            const writer = new writer_1.Writer(this.path, this.name);
            writer.contents = JSON.stringify(data);
            writer.write();
        }
        else {
            const reader = new reader_1.Reader(this.path, this.name);
            reader.read();
            try {
                data = JSON.parse(reader.contents);
            }
            catch (e) { }
        }
        return (this.info = data);
    }
    createFirstFile(dir) {
        const writer = new writer_1.Writer(this.path, `${dir}/1.json`);
        writer.contents = '{}';
        writer.write();
    }
}
exports.DirectoryIndex = DirectoryIndex;
