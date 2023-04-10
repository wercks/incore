"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractFile = void 0;
const fs = require("fs");
const Invalid_filename_exception_1 = require("./exception/Invalid-filename-exception");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class AbstractFile {
    constructor(path, name) {
        this._filename = '';
        this._path = '';
        this._absolutePath = null;
        this._contents = '';
        this.BUFFER_SIZE = 1024;
        this.fileManager = null;
        this.handle = null;
        this._exists = {};
        this.NOT_EXISTS = 1;
        this.CANNOT_OPEN = 2;
        this.CANNOT_WRITE = 3;
        this.cause = 0;
        if (path) {
            this.path = path;
            this.filename = name;
        }
    }
    getCause() {
        return this.cause;
    }
    get exists() {
        const path = this.absolutePath;
        if (path in this._exists && this._exists[path] !== undefined) {
            return this._exists[path];
        }
        this._exists[path] = fs.existsSync(path);
        return this._exists[path];
    }
    get contents() {
        return this._contents;
    }
    set contents(contents) {
        this._contents = contents;
    }
    cleanExists() {
        this._exists[this.absolutePath] = undefined;
    }
    get absolutePath() {
        if (this._absolutePath !== null) {
            return this._absolutePath;
        }
        this._absolutePath = `${this._path}/${this._filename}`;
        return this._absolutePath;
    }
    set path(pathname) {
        this._path = pathname.trim();
        if (!this._path || !/^[a-zA-Z0-9/:-_.\\ ]+/g.test(this._path)) {
            throw new Invalid_filename_exception_1.InvalidFilenameException('Invalid pathname ("pathname")!');
        }
    }
    set filename(name) {
        this._filename = name.trim();
        if (!this._filename || !/^[a-zA-Z0-9-_. ]+/g.test(this._filename)) {
            throw new Invalid_filename_exception_1.InvalidFilenameException(`Invalid filename ("${name}")!`);
        }
    }
    getFilename() {
        return this._filename;
    }
    getPathname() {
        return this._path;
    }
    resetFilename() {
        this._filename = this.fileManager.getFilename();
    }
    resetPathname() {
        this._path = this.fileManager.getPathname();
    }
    reset() {
        this.resetFilename();
        this.resetPathname();
        this.contents = this.fileManager.contents;
    }
}
exports.AbstractFile = AbstractFile;
