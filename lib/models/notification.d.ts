import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
import { $User } from './user';
export declare class Notification extends IncoreModel {
    notification_id?: number;
    from_uid: number;
    to_uid: number;
    category?: number;
    message: string;
    title: string;
    related_to: string;
    static tableName: string;
    static idColumn: string;
    fromUser?: $User;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Notification = IncoreModelInterface<Notification>;
