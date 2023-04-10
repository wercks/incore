import { IncoreApiActions } from '../enum/incore-api-actions';
/**
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { IncoreController } from './incore-controller';
import { IncoreRepository } from './incore-repository';
export declare class IncoreActionsController<T, R extends IncoreRepository<T>, C extends IncoreController<T, R>> {
    private controller;
    constructor(controller: C);
    exec: (action: IncoreApiActions) => any;
}
