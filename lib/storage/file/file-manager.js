"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const abstract_file_1 = require("./abstract-file");
const fs = require("fs");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class FileManager extends abstract_file_1.AbstractFile {
    constructor(path, name, createFiles = false) {
        super(path, name);
        if (createFiles === true) {
            this.createDirs();
            this.createFile();
        }
    }
    createFile(withContent = '') {
        const fileAddr = this.absolutePath;
        if (!fs.existsSync(fileAddr)) {
            fs.writeFileSync(fileAddr, withContent);
        }
    }
    createDirs() {
        const path = this.path;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive: true,
            });
        }
        return false;
    }
}
exports.FileManager = FileManager;
