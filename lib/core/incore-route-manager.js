"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreRouteManager = void 0;
const incore_middleware_placeholder_1 = require("../core/incore-middleware-placeholder");
const incore_actions_controller_1 = require("../core/incore-actions-controller");
const express_1 = require("express");
const multer_storage_1 = require("../utils/multer-storage");
const multer = require("multer");
class IncoreRouteManager {
    constructor(controller, path, middleware) {
        this._path = '';
        this.router = (0, express_1.Router)();
        this._path = path;
        if (middleware) {
            this.middleware = middleware;
        }
        this.controller = new incore_actions_controller_1.IncoreActionsController(controller);
        this.configure();
        this.initializeRoutes();
    }
    getMiddleware(action) {
        const defaultMiddlewareList = [
            (0, incore_middleware_placeholder_1.IncoreMiddlewarePlaceholder)(action),
            (0, incore_middleware_placeholder_1.IncoreMiddlewarePlaceholder)(action),
            (0, incore_middleware_placeholder_1.IncoreMiddlewarePlaceholder)(action),
        ];
        if (!this.middleware) {
            return defaultMiddlewareList;
        }
        const routeMiddlewareList = this.middleware.filter(m => m.action == action);
        if (!routeMiddlewareList) {
            return defaultMiddlewareList;
        }
        for (let i = 0; i < 3; i++) {
            const m = defaultMiddlewareList[i];
            if (m) {
                defaultMiddlewareList[i] = m;
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
        return `${this._path}/:id`;
    }
    get readAllRoute() {
        return `${this._path}`;
    }
    get updateRoute() {
        return `${this._path}/update/:id`;
    }
    get createRoute() {
        return `${this._path}/create`;
    }
    get deleteRoute() {
        return `${this._path}/del/:id`;
    }
    get patchRoute() {
        return `${this._path}/patch/:id`;
    }
}
exports.IncoreRouteManager = IncoreRouteManager;
