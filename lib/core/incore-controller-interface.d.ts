/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
import { IncoreHttpService } from './incore-http-service';
export declare abstract class IncoreControllerInterface {
    protected httpService: IncoreHttpService;
    constructor();
    protected abstract init(): void;
}
