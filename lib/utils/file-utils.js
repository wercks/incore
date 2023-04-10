"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUncached = exports.deleteFile = exports.mkdir = exports.isDir = exports.fileExists = exports.fileGetContents = exports.filePutContents = void 0;
const fs = require("fs");
const reader_1 = require("../storage/file/reader");
const writer_1 = require("../storage/file/writer");
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
function filePutContents(path, fileName, data) {
    const writer = new writer_1.Writer(path, fileName);
    writer.contents = data;
    return writer.write();
}
exports.filePutContents = filePutContents;
function fileGetContents(path, fileName) {
    const reader = new reader_1.Reader(path, fileName);
    reader.read();
    return reader.contents;
}
exports.fileGetContents = fileGetContents;
function fileExists(path) {
    return fs.existsSync(path);
}
exports.fileExists = fileExists;
function isDir(path) {
    return fileExists(path) && fs.lstatSync(path).isDirectory();
}
exports.isDir = isDir;
function mkdir(path, recursive = true) {
    return fs.mkdirSync(path, {
        recursive: recursive,
    });
}
exports.mkdir = mkdir;
function deleteFile(path) {
    return fs.unlinkSync(path);
}
exports.deleteFile = deleteFile;
async function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return await require(module);
}
exports.requireUncached = requireUncached;
