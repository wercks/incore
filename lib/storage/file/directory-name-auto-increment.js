"use strict";
/***
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryNameAutoIncrement = void 0;
class DirectoryNameAutoIncrement {
    static get($num, $max_files_per_dir = 5000) {
        const dir = Math.floor($num / $max_files_per_dir);
        return Math.floor(dir / 1000) + '/' + dir;
    }
}
exports.DirectoryNameAutoIncrement = DirectoryNameAutoIncrement;
