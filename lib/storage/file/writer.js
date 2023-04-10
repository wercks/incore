"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
const abstract_file_1 = require("../file/abstract-file");
const file_manager_1 = require("../file/file-manager");
const type_validator_1 = require("../../utils/type-validator");
const fs = require("fs");
class Writer extends abstract_file_1.AbstractFile {
    constructor(mixed_param1, mixed_param2 = null) {
        if (mixed_param1 instanceof file_manager_1.FileManager) {
            super();
            this.fileManager = mixed_param1;
            this.reset();
        }
        else if ((0, type_validator_1.isString)(mixed_param1) && (0, type_validator_1.isString)(mixed_param2)) {
            super(mixed_param1, mixed_param2);
        }
    }
    write() {
        fs.writeFileSync(this.absolutePath, this.contents);
    }
}
exports.Writer = Writer;
