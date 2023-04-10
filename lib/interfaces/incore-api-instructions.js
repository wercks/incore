"use strict";
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedHelper = exports.IncoreApiMetadataActions = void 0;
var IncoreApiMetadataActions;
(function (IncoreApiMetadataActions) {
    IncoreApiMetadataActions[IncoreApiMetadataActions["add"] = 1] = "add";
    IncoreApiMetadataActions[IncoreApiMetadataActions["update"] = 2] = "update";
    IncoreApiMetadataActions[IncoreApiMetadataActions["updateOrAdd"] = 3] = "updateOrAdd";
    IncoreApiMetadataActions[IncoreApiMetadataActions["deleteIfExists"] = 4] = "deleteIfExists";
})(IncoreApiMetadataActions = exports.IncoreApiMetadataActions || (exports.IncoreApiMetadataActions = {}));
const embedHelper = (...data) => {
    return `[${data.join(',')}]`;
};
exports.embedHelper = embedHelper;
