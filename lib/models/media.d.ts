import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
export declare class Media extends IncoreModel {
    media_id?: number;
    source: string;
    url: string;
    type?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    duration?: number;
    color_filter?: string;
    format?: string;
    mimetype?: string;
    resolution?: string;
    aspect_ratio?: string;
    bit_rate?: string;
    frame_rate?: string;
    channels?: string;
    sampling_rate?: string;
    commercial_name?: string;
    compression_mode: string;
    bit_depth?: string;
    /** Kilobyte */
    size?: number;
    related_to: string | number;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Media = IncoreModelInterface<Media>;
