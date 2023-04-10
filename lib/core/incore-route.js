"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreRoute = void 0;
const incore_api_actions_1 = require("../enum/incore-api-actions");
const incore_route_manager_1 = require("./incore-route-manager");
/**
 * @author Wercks de Oliveira
 *
 */
class IncoreRoute extends incore_route_manager_1.IncoreRouteManager {
    configure() { }
    initializeRoutes() {
        const readMiddlewareList = this.getMiddleware(incore_api_actions_1.IncoreApiActions.READ);
        const readAllMiddlewareList = this.getMiddleware(incore_api_actions_1.IncoreApiActions.READ_ALL);
        const createMiddlewareList = this.getMiddleware(incore_api_actions_1.IncoreApiActions.CREATE);
        const updateMiddlewareList = this.getMiddleware(incore_api_actions_1.IncoreApiActions.UPDATE);
        const delMiddlewareList = this.getMiddleware(incore_api_actions_1.IncoreApiActions.DEL);
        const patchMiddlewareList = this.getMiddleware(incore_api_actions_1.IncoreApiActions.PATCH);
        this.router.get(this.readAllRoute, readAllMiddlewareList[0], readAllMiddlewareList[1], readAllMiddlewareList[2], this.controller.exec(incore_api_actions_1.IncoreApiActions.READ_ALL));
        this.router.get(this.readRoute, readMiddlewareList[0], readMiddlewareList[1], readMiddlewareList[2], this.controller.exec(incore_api_actions_1.IncoreApiActions.READ));
        this.router.post(this.createRoute, createMiddlewareList[0], createMiddlewareList[1], createMiddlewareList[2], this.controller.exec(incore_api_actions_1.IncoreApiActions.CREATE));
        this.router.put(this.updateRoute, updateMiddlewareList[0], updateMiddlewareList[1], updateMiddlewareList[2], this.controller.exec(incore_api_actions_1.IncoreApiActions.UPDATE));
        this.router.post(this.deleteRoute, delMiddlewareList[0], delMiddlewareList[1], delMiddlewareList[2], this.controller.exec(incore_api_actions_1.IncoreApiActions.DEL));
        this.router.post(this.patchRoute, patchMiddlewareList[0], patchMiddlewareList[1], patchMiddlewareList[2], this.controller.exec(incore_api_actions_1.IncoreApiActions.PATCH));
    }
}
exports.IncoreRoute = IncoreRoute;
