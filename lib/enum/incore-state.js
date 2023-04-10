"use strict";
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreState = void 0;
var IncoreState;
(function (IncoreState) {
    IncoreState[IncoreState["idle"] = 0] = "idle";
    IncoreState[IncoreState["loading"] = 1] = "loading";
    IncoreState[IncoreState["error"] = 2] = "error";
    IncoreState[IncoreState["success"] = 3] = "success";
})(IncoreState = exports.IncoreState || (exports.IncoreState = {}));
