import { IncoreModel, IncoreModelInterface } from '../core/incore-model';
import { $Address } from './address';
import { $Media } from './media';
import { $Profession } from './profession';
import { IncoreApiResponse } from '../interfaces/incore-api-response';
import { $UserRole } from './user_role';
export declare class User extends IncoreModel {
    uid?: number;
    name: string;
    first_name?: string;
    last_name?: string;
    nickname?: string;
    social_addr?: string;
    trade_name?: string;
    corporate_name?: string;
    company_open_date?: string;
    /**
     * CNAE
     */
    company_activity_code?: string;
    /**
     * Natureza Jurídica
     */
    company_legal_nature?: string;
    account_type: 'individual' | 'merchant';
    company_capital?: number;
    birth_date: string;
    addr_id?: number;
    media_id?: number;
    phone_number?: string;
    cpf?: string;
    rg?: string;
    ein?: string;
    ssn?: string;
    cnpj?: string;
    email: string;
    profession_id?: number;
    professional_document_number?: string;
    about?: string;
    logged_at?: string;
    device_info?: string;
    ip?: string;
    latitude?: number;
    longitude?: number;
    password?: string;
    type?: number;
    permission?: number;
    static tableName: string;
    static idColumn: string;
    media?: $Media;
    addresses?: $Address[];
    roles?: $UserRole[];
    professions?: $Profession[];
    static relationMappings: any;
    static get jsonSchema(): {
        type: string;
        required: any[];
        properties: any;
    };
    exec(): Promise<IncoreApiResponse<any> | null>;
    private validateCode;
    private updatePwd;
    private updatePwdApp;
    private getCode;
}
export declare type $User = IncoreModelInterface<User>;
