import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Profession extends IncoreModel {
    profession_id: number;
    name: string;
    description: string;
    media_id: number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Profession = IncoreModelInterface<Profession>;
