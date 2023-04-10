"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreApiRouteManager = void 0;
const express_1 = require("express");
const multer_storage_1 = require("../utils/multer-storage");
const multer = require("multer");
const incore_api_actions_controller_1 = require("./incore-api-actions-controller");
class IncoreApiRouteManager {
    constructor(model, path, middleware) {
        this._path = '';
        this.router = (0, express_1.Router)();
        this._path = path;
        if (middleware) {
            this.middleware = middleware;
        }
        this.model = model;
        this.controller = new incore_api_actions_controller_1.IncoreApiActionsController();
        this.configure();
        this.initializeRoutes();
    }
    getMiddleware(action) {
        var _a;
        const defaultMiddlewareList = [];
        if (!this.middleware) {
            return defaultMiddlewareList;
        }
        const routeMiddleware = this.middleware.find(m => m.action == action);
        if (!routeMiddleware) {
            return defaultMiddlewareList;
        }
        for (let incoreApiRouteHandler of routeMiddleware.middleware) {
            if (incoreApiRouteHandler &&
                typeof incoreApiRouteHandler.handler === 'function') {
                const args = (_a = incoreApiRouteHandler.args) !== null && _a !== void 0 ? _a : [];
                defaultMiddlewareList.push(incoreApiRouteHandler.handler.apply(null, args));
            }
        }
        return defaultMiddlewareList;
    }
    get path() {
        return this._path;
    }
    multer(path = '') {
        return multer({ storage: (0, multer_storage_1.storage)(path) });
    }
    get readRoute() {
        return `${this._path}`;
    }
    get updateRoute() {
        return `${this._path}/update`;
    }
    get patchRoute() {
        return `${this._path}/patch`;
    }
    get createRoute() {
        return `${this._path}/create`;
    }
    get upsertRoute() {
        return `${this._path}/upsert`;
    }
    get loginRoute() {
        return `${this._path}/login`;
    }
    get signupRoute() {
        return `${this._path}/signup`;
    }
    get refreshRoute() {
        return `${this._path}/refresh`;
    }
    get deleteRoute() {
        return `${this._path}/del`;
    }
    get deleteRoute2() {
        return `${this._path}/delete`;
    }
}
exports.IncoreApiRouteManager = IncoreApiRouteManager;
