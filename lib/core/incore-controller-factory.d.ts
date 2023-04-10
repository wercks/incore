/**
 * @author Wercks de Oliveira <wercks@live.com>
 */
import { IncoreController } from './incore-controller';
import { IncoreRepository } from './incore-repository';
import { IncoreModel } from './incore-model';
export declare class IncoreControllerFactory<T extends IncoreModel, R extends IncoreRepository<T>> extends IncoreController<T, R> {
    protected init(): void;
}
