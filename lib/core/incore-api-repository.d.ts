import { Token } from '../interfaces/token';
import { IncoreApiResponse } from '../interfaces/incore-api-response';
import { $User } from '../models/user';
import { IncoreModel } from './incore-model';
import { IncoreExpressRequest } from '../interfaces/incore-express-req';
import { IncoreApiInstructions } from '../interfaces/incore-api-instructions';
import { $Media } from '../models/media';
/**
 *
 * @author Wercks de Oliveira <wercks@live.com>
 *
 */
export declare abstract class IncoreApiRepository<T> {
    private _model;
    protected req: IncoreExpressRequest;
    private httpService;
    protected instructions: IncoreApiInstructions;
    ID: number;
    constructor(model: IncoreModel);
    set apiInstructions(instructions: IncoreApiInstructions);
    get apiInstructions(): IncoreApiInstructions;
    set request(r: IncoreExpressRequest);
    get request(): IncoreExpressRequest;
    get model(): IncoreModel;
    private setupHttpService;
    private readExternal;
    private updateExternal;
    private patchExternal;
    private deleteExternal;
    private createExternal;
    read(): Promise<IncoreApiResponse<T>>;
    patch(): Promise<IncoreApiResponse<T>>;
    update(): Promise<IncoreApiResponse<T>>;
    handleCrypt(): Promise<void>;
    handleMedia(metadataId: string | number): Promise<$Media[]>;
    upsert(): Promise<IncoreApiResponse<T>>;
    create(): Promise<IncoreApiResponse<T>>;
    handleMetadata(metadataId: string | number): Promise<void>;
    private getMetadata;
    signup(): Promise<IncoreApiResponse<T>>;
    createMetadataId(): string;
    createSocialAddr(data: any, increment?: number): Promise<string>;
    login(): Promise<IncoreApiResponse<T>>;
    del(): Promise<IncoreApiResponse<T>>;
    createToken(user: $User): Token;
    createRefreshToken(user: $User): Token;
    protected abstract setup(): void;
}
