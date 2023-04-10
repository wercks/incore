"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncoreActionsController = void 0;
const incore_code_1 = require("../enum/incore-code");
const incore_api_actions_1 = require("../enum/incore-api-actions");
class IncoreActionsController {
    constructor(controller) {
        this.exec = (action) => {
            return async (req, res, next) => {
                var _a;
                try {
                    const remoteData = (_a = req.body) !== null && _a !== void 0 ? _a : {};
                    switch (action) {
                        case incore_api_actions_1.IncoreApiActions.READ:
                            await this.controller.readById(remoteData.id, remoteData.params, remoteData.path);
                            break;
                        case incore_api_actions_1.IncoreApiActions.READ_ALL:
                            await this.controller.readAll(remoteData.params, remoteData.path);
                            break;
                        case incore_api_actions_1.IncoreApiActions.CREATE:
                            await this.controller.create(remoteData.data, remoteData.path);
                            break;
                        case incore_api_actions_1.IncoreApiActions.UPDATE:
                            await this.controller.update(remoteData.id, remoteData.data, remoteData.path);
                            break;
                        case incore_api_actions_1.IncoreApiActions.DEL:
                            await this.controller.del(remoteData.id, remoteData.data, remoteData.path);
                            break;
                        case incore_api_actions_1.IncoreApiActions.PATCH:
                            await this.controller.patch(remoteData.id, remoteData.data, remoteData.path);
                            break;
                    }
                    if (this.controller.error) {
                        res.status(this.controller.response.status).json(this.controller.response.res);
                        return;
                    }
                    res.status(incore_code_1.IncoreResponseCode.OK).json(this.controller.response.res);
                }
                catch (e) {
                    res.status(this.controller.response.status).json(this.controller.response.res);
                    return;
                }
            };
        };
        this.controller = controller;
    }
}
exports.IncoreActionsController = IncoreActionsController;
