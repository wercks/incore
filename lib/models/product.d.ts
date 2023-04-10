import { IncoreModel } from '../core/incore-model';
import { Media } from './media';
import { IncoreModelInterface } from '../core/incore-model';
export declare class Product extends IncoreModel {
    product_id?: number;
    uid: number;
    product_state_id?: number;
    title: string;
    offer_id?: string;
    description: string;
    url?: string;
    mobile_url?: string;
    media_id?: number;
    content_language?: string;
    target_country?: string;
    feed_label?: string;
    channel: 'ONLINE' | 'LOCAL' | 'ONLINE_LOCAL';
    expiration_date?: string;
    adult?: number;
    age_group?: number;
    /**
     * Status de disponibilidade
     */
    availability?: number;
    availability_date?: string;
    condition?: 'NEW' | 'NEVER_USED' | 'SECOND_HAND_GOOD' | 'SECOND_HAND_NOT_GOOD' | 'LESS_USED';
    gender?: 'MALE' | 'FEMALE' | 'UNISEX';
    gtin?: string;
    /**
     * Manufacturer Part Number (MPN) of the item
     */
    mpn?: string;
    /**
     *  Shared identifier for all variants of the same product
     */
    group_id?: number;
    material?: string;
    /**
     * Pattern
     */
    pattern?: string;
    price: number;
    price_currency?: string;
    sale_price?: number;
    sale_price_currency?: string;
    sale_price_effective_start_date?: string;
    sale_price_effective_end_date?: string;
    height?: number;
    featured?: number;
    height_unit?: string;
    length?: number;
    length_unit?: string;
    width?: number;
    width_unit?: string;
    weight?: number;
    weight_unit?: string;
    sizes?: string;
    installments?: number;
    delivery?: number;
    paused?: number;
    ingredient?: number;
    media?: Media;
    static tableName: string;
    static idColumn: string;
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
}
export declare type $Product = IncoreModelInterface<Product>;
