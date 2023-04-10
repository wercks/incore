import { IncoreApiRepository } from './incore-api-repository';
import { IncoreRepository } from './incore-repository';
import { IncoreModel } from './incore-model';
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare class IncoreApiRepositoryFactory<T> extends IncoreApiRepository<T> {
    protected setup(): void;
}
export declare class IncoreRepositoryFactory<T extends IncoreModel> extends IncoreRepository<T> {
    protected setup(): void;
}
