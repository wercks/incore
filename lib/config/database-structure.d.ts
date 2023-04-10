import { Knex } from 'knex';
export declare const tableDefaults: (knex: Knex, table: Knex.CreateTableBuilder, createMetadataId?: boolean) => void;
export declare function createTables(knex: Knex): Promise<void>;
export declare function dropTables(knex: Knex): Promise<void>;
export declare function seed(knex: Knex): Promise<void>;
