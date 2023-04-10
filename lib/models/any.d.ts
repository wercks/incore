import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class AnyModel extends IncoreModel {
    static tableName: string;
    static idColumn: string;
}
export declare type $AnyModel = IncoreModelInterface<AnyModel>;
