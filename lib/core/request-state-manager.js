"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStateManager = void 0;
const incore_state_1 = require("../enum/incore-state");
class RequestStateManager {
    static checkState(name, requestState) {
        const state = this.state(name);
        if (state === null) {
            return false;
        }
        return state == requestState;
    }
    static setState(name = 'appState', requestState) {
        const stateInfoIndex = this.states.findIndex(s => s.name == name);
        if (stateInfoIndex < 0) {
            this.states.push({
                name: name,
                state: requestState,
            });
            return;
        }
        this.states[stateInfoIndex].state = requestState;
    }
    static state(name = 'appState') {
        var _a, _b;
        return (_b = (_a = this.states.find(s => s.name == name)) === null || _a === void 0 ? void 0 : _a.state) !== null && _b !== void 0 ? _b : null;
    }
    static setStateLoading(name = 'appState') {
        this.setState(name, incore_state_1.IncoreState.loading);
    }
    static setStateIdle(name = 'appState') {
        this.setState(name, incore_state_1.IncoreState.idle);
    }
    static setStateError(name = 'appState') {
        this.setState(name, incore_state_1.IncoreState.error);
    }
    static setStateSuccess(name = 'appState') {
        this.setState(name, incore_state_1.IncoreState.success);
    }
    static loading(name = 'appState') {
        return this.checkState(name, incore_state_1.IncoreState.loading);
    }
    static idle(name = 'appState') {
        return this.checkState(name, incore_state_1.IncoreState.idle);
    }
    static error(name = 'appState') {
        return this.checkState(name, incore_state_1.IncoreState.error);
    }
    static success(name = 'appState') {
        return this.checkState(name, incore_state_1.IncoreState.success);
    }
}
exports.RequestStateManager = RequestStateManager;
RequestStateManager.states = [];
