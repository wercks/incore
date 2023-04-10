"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreRepositoryFactory = exports.IncoreApiRepositoryFactory = void 0;
const incore_api_repository_1 = require("./incore-api-repository");
const incore_repository_1 = require("./incore-repository");
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
class IncoreApiRepositoryFactory extends incore_api_repository_1.IncoreApiRepository {
    setup() { }
}
exports.IncoreApiRepositoryFactory = IncoreApiRepositoryFactory;
class IncoreRepositoryFactory extends incore_repository_1.IncoreRepository {
    setup() { }
}
exports.IncoreRepositoryFactory = IncoreRepositoryFactory;
