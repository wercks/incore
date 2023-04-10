"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreApiRoute = void 0;
const incore_api_route_manager_1 = require("./incore-api-route-manager");
const repository_middleware_1 = require("../middleware/repository-middleware");
const incore_1 = require("../config/incore");
const route_roles_middleware_1 = require("../middleware/route-roles-middleware");
/**
 * @author Wercks de Oliveira
 *
 */
class IncoreApiRoute extends incore_api_route_manager_1.IncoreApiRouteManager {
    configure() { }
    initializeRoutes() {
        const readMiddlewareList = this.getMiddleware('READ');
        const createMiddlewareList = this.getMiddleware('CREATE');
        const updateMiddlewareList = this.getMiddleware('UPDATE');
        // const upsertMiddlewareList = this.getMiddleware('UPSERT')
        const delMiddlewareList = this.getMiddleware('DELETE');
        const loginMiddlewareList = this.getMiddleware('LOGIN');
        const patchMiddlewareList = this.getMiddleware('PATCH');
        const signupMiddlewareList = this.getMiddleware('SIGNUP');
        const refreshMiddlewareList = this.getMiddleware('REFRESH');
        incore_1.Incore.dataId = this.model['idColumn'];
        const getArgs = (route, action, middleware) => {
            return [
                route,
                (0, repository_middleware_1.repositoryMiddleWare)(action, this.model),
                ...middleware,
                (0, route_roles_middleware_1.routeRolesMiddleware)(action),
                this.controller.exec(),
            ];
        };
        if (this.path.includes('auth')) {
            this.router.post.apply(this.router, getArgs(this.loginRoute, 'LOGIN', loginMiddlewareList));
            this.router.post.apply(this.router, getArgs(this.signupRoute, 'SIGNUP', signupMiddlewareList));
            this.router.post.apply(this.router, getArgs(this.refreshRoute, 'REFRESH', refreshMiddlewareList));
        }
        else {
            this.router.get.apply(this.router, getArgs(this.readRoute, 'READ', readMiddlewareList));
            this.router.post.apply(this.router, getArgs(this.readRoute, 'READ', readMiddlewareList));
            this.router.post.apply(this.router, getArgs(this.createRoute, 'CREATE', createMiddlewareList));
            // this.router.post.apply(
            //     this.router,
            //     getArgs(this.upsertRoute, 'UPSERT', upsertMiddlewareList)
            // )
            this.router.put.apply(this.router, getArgs(this.updateRoute, 'UPDATE', updateMiddlewareList));
            this.router.put.apply(this.router, getArgs(`${this.updateRoute}/:id`, 'UPDATE', updateMiddlewareList));
            this.router.patch.apply(this.router, getArgs(this.patchRoute, 'PATCH', patchMiddlewareList));
            this.router.patch.apply(this.router, getArgs(`${this.patchRoute}/:id`, 'PATCH', patchMiddlewareList));
            this.router.delete.apply(this.router, getArgs(this.deleteRoute, 'DELETE', delMiddlewareList));
            this.router.delete.apply(this.router, getArgs(`${this.deleteRoute}/:id`, 'DELETE', delMiddlewareList));
            this.router.delete.apply(this.router, getArgs(this.deleteRoute2, 'DELETE', delMiddlewareList));
            this.router.delete.apply(this.router, getArgs(`${this.deleteRoute2}/:id`, 'DELETE', delMiddlewareList));
        }
    }
}
exports.IncoreApiRoute = IncoreApiRoute;
