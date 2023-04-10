"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.dropTables = exports.createTables = exports.tableDefaults = void 0;
const incore_status_1 = require("../enum/incore-status");
const city_1 = require("../models/city");
const country_1 = require("../models/country");
const country_state_1 = require("../models/country-state");
const places = require("../data/seed/places-br.json");
const users = require("../data/seed/users.json");
const professions = require("../data/seed/professions-br.json");
const crypto = require("crypto");
const incore_repository_factory_1 = require("../core/incore-repository-factory");
const user_1 = require("../models/user");
const crypto_1 = require("crypto");
const tableDefaults = (knex, table, createMetadataId = true) => {
    if (createMetadataId) {
        table.string('metadata_id').nullable();
    }
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').nullable();
    table.integer('status', 10).notNullable().defaultTo(incore_status_1.IncoreStatus.ACTIVE);
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_0900_ai_ci');
};
exports.tableDefaults = tableDefaults;
async function createTables(knex) {
    const incoreTableExists = await knex.schema.hasTable('incore');
    if (!incoreTableExists) {
        await knex.schema.createTable('incore', table => {
            table.bigIncrements('incore_id').unsigned().primary();
            table.text('id_secret').notNullable();
            (0, exports.tableDefaults)(knex, table, false);
        });
    }
    const metadataExists = await knex.schema.hasTable('metadata');
    if (!metadataExists) {
        await knex.schema.createTable('metadata', table => {
            table.bigIncrements('metadata_id').unsigned().primary();
            table.string('related_to_id').nullable().index('related_to_id');
            table.string('name').notNullable();
            table.text('val').notNullable();
            (0, exports.tableDefaults)(knex, table, false);
        });
    }
    const mediaExists = await knex.schema.hasTable('media');
    if (!mediaExists) {
        await knex.schema.createTable('media', table => {
            table.bigIncrements('media_id').unsigned().primary();
            table.string('source', 255).notNullable();
            table.text('url').nullable();
            table.integer('type', 1).nullable().defaultTo(1);
            table.integer('width').nullable();
            table.integer('height').nullable();
            table.integer('x').nullable().defaultTo(0);
            table.integer('y').nullable().defaultTo(0);
            table.integer('duration').nullable().defaultTo(0);
            table.string('color_filter', 150).nullable();
            table.string('format').nullable();
            table.string('mimetype').nullable();
            table.string('resolution').nullable();
            table.string('aspect_ratio').nullable();
            table.string('bit_rate').nullable();
            table.string('frame_rate').nullable();
            table.string('channels').nullable();
            table.string('sampling_rate').nullable();
            table.string('commercial_name').nullable();
            table.string('compression_mode').nullable();
            table.string('bit_depth').nullable();
            table.integer('size').nullable();
            table.string('related_to').nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    }
    const countriesExists = await knex.schema.hasTable('countries');
    if (!countriesExists)
        await knex.schema.createTable('countries', table => {
            table.bigIncrements('country_id').unsigned().primary();
            table.string('name', 255).nullable();
            table.string('alpha_2_code', 2).nullable();
            table.string('alpha_3_code', 3).nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const country_states = await knex.schema.hasTable('country_states');
    if (!country_states)
        await knex.schema.createTable('country_states', table => {
            table.bigIncrements('country_state_id').unsigned().primary();
            table.string('name', 70).notNullable();
            table.string('code', 3).notNullable();
            table.integer('country_id').notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const cities = await knex.schema.hasTable('cities');
    if (!cities)
        await knex.schema.createTable('cities', table => {
            table.bigIncrements('city_id').unsigned().primary();
            table.string('name', 255).notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const addr_groups = await knex.schema.hasTable('addr_groups');
    if (!addr_groups)
        await knex.schema.createTable('addr_groups', table => {
            table.bigIncrements('addr_group_id').unsigned().primary();
            table.bigInteger('uid').unsigned().nullable();
            table.string('name').notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const addresses = await knex.schema.hasTable('addresses');
    if (!addresses)
        await knex.schema.createTable('addresses', table => {
            table.bigIncrements('addr_id').unsigned().primary();
            table.integer('number').notNullable();
            table.string('zipcode', 25).notNullable();
            table.string('street', 255).notNullable();
            table.string('complement', 255).nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const users = await knex.schema.hasTable('users');
    if (!users)
        await knex.schema.createTable('users', table => {
            table.bigIncrements('uid').unsigned().primary();
            table.string('name', 255).notNullable();
            table.string('first_name').nullable();
            table.string('last_name').nullable();
            table.string('nickname').nullable();
            table.string('social_addr').nullable();
            table.string('trade_name', 255).nullable();
            table.string('corporate_name', 255).nullable();
            table.date('company_open_date').nullable();
            table.string('company_activity_code').nullable();
            table.string('company_activity_name').nullable();
            table.string('company_legal_nature').nullable();
            table.string('account_type').notNullable().defaultTo('individual'); // merchant
            table.integer('company_capital').nullable();
            table.date('birth_date').nullable();
            table.string('phone_number', 20).nullable();
            table.string('cpf', 15).nullable();
            table.string('rg', 25).nullable();
            table.string('ein').nullable(); // Employer Identification Number
            table.string('ssn').nullable(); // social security number
            table.string('cnpj', 25).nullable();
            table.string('email', 150).notNullable();
            table.bigInteger('profession_id').nullable();
            table.string('professional_document_number').nullable();
            table.text('about').nullable();
            table.string('password', 255).notNullable();
            table.dateTime('logged_at').nullable();
            table.integer('type').notNullable().defaultTo(1);
            table.integer('permission').notNullable().defaultTo(1);
            table.text('device_info').nullable();
            table.string('ip').nullable();
            table.decimal('latitude', 10, 8).nullable();
            table.decimal('longitude', 11, 8).nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const products = await knex.schema.hasTable('products');
    if (!products)
        await knex.schema.createTable('products', table => {
            table.bigIncrements('product_id').unsigned().primary();
            table.integer('product_state_id').nullable();
            table.integer('offer_id').nullable();
            table.string('title', 255).notNullable();
            table.text('description').nullable();
            table.string('url', 255).nullable();
            table.string('mobile_url', 255).nullable();
            table.integer('featured').nullable().defaultTo(0);
            table.string('content_language', 2).nullable().defaultTo('pt');
            table.string('target_country', 3).nullable().defaultTo('BR');
            table.string('feed_label').nullable();
            table.string('channel').nullable().defaultTo('ONLINE_LOCAL');
            table.dateTime('expiration_date').nullable();
            table.integer('adult').nullable().defaultTo(0);
            table.integer('age_group').nullable();
            table.integer('availability').notNullable().defaultTo(1);
            table
                .dateTime('availability_date')
                .notNullable()
                .defaultTo(knex.fn.now());
            table.string('brand').nullable();
            table.string('color').nullable();
            /**
             * NEW | NEVER_USED | SECOND_HAND_GOOD | SECOND_HAND_NOT_GOOD | LESS_USED
             */
            table.string('condition').nullable().defaultTo('NEW');
            /**
             * FEMALE | MALE | UNISEX
             */
            table.string('gender').nullable().defaultTo('UNISEX');
            table.string('gtin').nullable();
            // Shared identifier for all variants of the same product
            table.integer('group_id').nullable();
            table.string('material').nullable();
            // Manufacturer Part Number (MPN) of the item
            table.string('mpn').nullable();
            // Pattern, e.g.: polka dots
            table.string('pattern').nullable();
            table.integer('price').notNullable();
            table.string('price_currency', 5).notNullable().defaultTo('BRL');
            table.integer('sale_price').nullable();
            table.string('sale_price_currency', 5).nullable().defaultTo('BRL');
            table.dateTime('sale_price_effective_start_date').nullable();
            table.dateTime('sale_price_effective_end_date').nullable();
            table.integer('height').nullable();
            table.string('height_unit', 10).nullable();
            table.integer('length').nullable();
            table.string('length_unit', 10).nullable();
            table.integer('width').nullable();
            table.string('width_unit', 10).nullable();
            table.integer('weight').nullable();
            table.string('weight_unit', 10).nullable();
            table.text('sizes').nullable();
            table.integer('installments').notNullable().defaultTo(1);
            table.integer('delivery').nullable().defaultTo(0);
            table.integer('ingredient').nullable().defaultTo(0);
            table.integer('paused').nullable().defaultTo(0);
            (0, exports.tableDefaults)(knex, table);
        });
    const products_categories = await knex.schema.hasTable('products_categories');
    if (!products_categories)
        await knex.schema.createTable('products_categories', table => {
            table.bigIncrements('product_category_id').unsigned().primary();
            table.integer('uid');
            (0, exports.tableDefaults)(knex, table);
        });
    const categories = await knex.schema.hasTable('categories');
    if (!categories)
        await knex.schema.createTable('categories', table => {
            table.bigIncrements('category_id').unsigned().primary();
            table.string('name').notNullable();
            table.string('url').notNullable();
            table.integer('uid').notNullable();
            table.integer('type').notNullable(); // 1 = category; 2 = subcategory
            (0, exports.tableDefaults)(knex, table);
        });
    const tags = await knex.schema.hasTable('tags');
    if (!tags)
        await knex.schema.createTable('tags', table => {
            table.bigIncrements('tag_id').unsigned().primary();
            table.string('name').notNullable();
            table.string('name_utf8').notNullable();
            table.integer('generic_content_id').nullable();
            table.integer('uid').notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const notifications = await knex.schema.hasTable('notifications');
    if (!notifications)
        await knex.schema.createTable('notifications', table => {
            table.bigIncrements('notification_id').unsigned().primary();
            table.bigInteger('from_uid').notNullable();
            table.bigInteger('to_uid').notNullable();
            table.string('message').notNullable();
            table.string('title').notNullable();
            table.integer('category').nullable();
            table.string('related_to').nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const roles = await knex.schema.hasTable('roles');
    if (!roles)
        await knex.schema.createTable('roles', table => {
            table.bigIncrements('role_id').unsigned().primary();
            table.string('name', 100).notNullable();
            table.string('uniq_id', 100).notNullable();
            table.string('description').nullable();
            table.integer('editable').notNullable();
            table.integer('deletable').notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const user_roles = await knex.schema.hasTable('user_roles');
    if (!user_roles)
        await knex.schema.createTable('user_roles', table => {
            table.bigIncrements('user_role_id').unsigned().primary();
            (0, exports.tableDefaults)(knex, table);
        });
    const coupons = await knex.schema.hasTable('coupons');
    if (!coupons)
        await knex.schema.createTable('coupons', table => {
            table.bigIncrements('coupon_id').unsigned().primary();
            table.integer('uid').notNullable();
            table.string('title').notNullable();
            table.string('description').nullable();
            table.integer('fixed_value').notNullable();
            table.double('percent_value').notNullable();
            table.string('value_type', 35).notNullable().defaultTo('PERCENT'); // PERCENT | FIXED
            table.string('code').notNullable();
            table.dateTime('valid_until');
            (0, exports.tableDefaults)(knex, table);
        });
    const professions = await knex.schema.hasTable('professions');
    if (!professions)
        await knex.schema.createTable('professions', table => {
            table.bigIncrements('profession_id').unsigned().primary();
            table.string('name', 255).notNullable();
            table.text('description').nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const districts = await knex.schema.hasTable('districts');
    if (!districts)
        await knex.schema.createTable('districts', table => {
            table.bigIncrements('district_id').unsigned().primary();
            table.string('name', 255).notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const cart = await knex.schema.hasTable('cart');
    if (!cart)
        await knex.schema.createTable('cart', table => {
            table.bigIncrements('cart_id').unsigned().primary();
            table.integer('uid').notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const cart_items = await knex.schema.hasTable('cart_items');
    if (!cart_items)
        await knex.schema.createTable('cart_items', table => {
            table.bigIncrements('cart_item_id').unsigned().primary();
            table.integer('uid').notNullable();
            table.integer('cart_id').notNullable();
            table.integer('product_id').notNullable();
            table.integer('quantity').notNullable();
            // defini o price aqui pois pode mudar o valor do produto depois
            table.integer('price').notNullable();
            table.integer('total_price').notNullable();
            (0, exports.tableDefaults)(knex, table);
        });
    const merchants_config = await knex.schema.hasTable('merchants_config');
    if (!merchants_config)
        await knex.schema.createTable('merchants_config', table => {
            table.bigIncrements('merchant_config_id').unsigned().primary();
            table.integer('uid').notNullable();
            table.integer('default_config').notNullable().defaultTo(0);
            table.double('tax_credit_card').notNullable();
            table.double('tax_debit_card').notNullable();
            table.double('tax_boleto').notNullable();
            table.double('tax_voucher').notNullable();
            table.double('tax_bank_transfer').notNullable();
            table.double('tax_cash').notNullable();
            table.double('tax_pix').notNullable();
            table.double('max_installments').notNullable();
            table.double('tax_installment').notNullable();
            table.double('tax_installment_1').notNullable();
            table.double('tax_installment_2').notNullable();
            table.double('tax_installment_3').notNullable();
            table.double('tax_installment_4').notNullable();
            table.double('tax_installment_5').notNullable();
            table.double('tax_installment_6').notNullable();
            table.double('tax_installment_7').notNullable();
            table.double('tax_installment_8').notNullable();
            table.double('tax_installment_9').notNullable();
            table.double('tax_installment_10').notNullable();
            table.double('tax_installment_11').notNullable();
            table.double('tax_installment_12').notNullable();
            table.string('recipient_id').notNullable();
            table.string('recipient_token').nullable();
            (0, exports.tableDefaults)(knex, table);
        });
    await knex.schema.table('cities', table => {
        table
            .bigInteger('country_state_id')
            .unsigned()
            .notNullable()
            .references('country_state_id')
            .inTable('country_states')
            .onDelete('RESTRICT');
        table
            .bigInteger('country_id')
            .unsigned()
            .notNullable()
            .references('country_id')
            .inTable('countries')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('addresses', table => {
        table
            .bigInteger('addr_group_id')
            .unsigned()
            .notNullable()
            .references('addr_group_id')
            .inTable('addr_groups')
            .onDelete('RESTRICT');
        table
            .bigInteger('uid')
            .unsigned()
            .notNullable()
            .references('uid')
            .inTable('users')
            .onDelete('CASCADE');
        table
            .bigInteger('city_id')
            .unsigned()
            .notNullable()
            .references('city_id')
            .inTable('cities')
            .onDelete('RESTRICT');
        table
            .bigInteger('district_id')
            .unsigned()
            .notNullable()
            .references('district_id')
            .inTable('districts')
            .onDelete('RESTRICT');
        table
            .bigInteger('country_state_id')
            .unsigned()
            .notNullable()
            .references('country_state_id')
            .inTable('country_states')
            .onDelete('RESTRICT');
        table
            .bigInteger('country_id')
            .unsigned()
            .notNullable()
            .references('country_id')
            .inTable('countries')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('users', table => {
        table
            .bigInteger('addr_id')
            .unsigned()
            .nullable()
            .references('addr_id')
            .inTable('addresses')
            .onDelete('RESTRICT');
        table
            .bigInteger('media_id')
            .unsigned()
            .nullable()
            .references('media_id')
            .inTable('media')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('user_roles', table => {
        table
            .bigInteger('uid')
            .unsigned()
            .nullable()
            .references('uid')
            .inTable('users')
            .onDelete('RESTRICT');
        table
            .bigInteger('role_id')
            .unsigned()
            .nullable()
            .references('role_id')
            .inTable('roles')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('products', table => {
        table
            .bigInteger('media_id')
            .unsigned()
            .nullable()
            .references('media_id')
            .inTable('media')
            .onDelete('RESTRICT');
        table
            .bigInteger('uid')
            .unsigned()
            .nullable()
            .references('uid')
            .inTable('users')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('addr_groups', table => {
        table
            .bigInteger('media_id')
            .unsigned()
            .nullable()
            .references('media_id')
            .inTable('media')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('products_categories', table => {
        table
            .bigInteger('category_id')
            .unsigned()
            .notNullable()
            .references('category_id')
            .inTable('categories')
            .onDelete('CASCADE');
        table
            .bigInteger('product_id')
            .unsigned()
            .notNullable()
            .references('product_id')
            .inTable('products')
            .onDelete('CASCADE');
    });
    await knex.schema.table('categories', table => {
        table
            .bigInteger('media_id')
            .unsigned()
            .nullable()
            .references('media_id')
            .inTable('media')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('tags', table => {
        table
            .bigInteger('product_id')
            .unsigned()
            .notNullable()
            .references('product_id')
            .inTable('products')
            .onDelete('CASCADE');
    });
    await knex.schema.table('professions', table => {
        table
            .bigInteger('media_id')
            .unsigned()
            .nullable()
            .references('media_id')
            .inTable('media')
            .onDelete('RESTRICT');
    });
    await knex.schema.table('districts', table => {
        table
            .bigInteger('city_id')
            .unsigned()
            .notNullable()
            .references('city_id')
            .inTable('cities')
            .onDelete('RESTRICT');
        table
            .bigInteger('country_state_id')
            .unsigned()
            .notNullable()
            .references('country_state_id')
            .inTable('country_states')
            .onDelete('RESTRICT');
        table
            .bigInteger('country_id')
            .unsigned()
            .notNullable()
            .references('country_id')
            .inTable('countries')
            .onDelete('RESTRICT');
    });
}
exports.createTables = createTables;
async function dropTables(knex) {
    await knex.raw('SET foreign_key_checks = 0;');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('districts');
    await knex.schema.dropTableIfExists('professions');
    await knex.schema.dropTableIfExists('media');
    await knex.schema.dropTableIfExists('countries');
    await knex.schema.dropTableIfExists('country_states');
    await knex.schema.dropTableIfExists('cities');
    await knex.schema.dropTableIfExists('addr_groups');
    await knex.schema.dropTableIfExists('addresses');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('products_categories');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('tags');
    await knex.schema.dropTableIfExists('roles');
    await knex.schema.dropTableIfExists('user_roles');
    await knex.schema.dropTableIfExists('coupons');
    await knex.schema.dropTableIfExists('cart');
    await knex.schema.dropTableIfExists('cart_items');
    await knex.schema.dropTableIfExists('merchants_config');
    knex.raw('SET foreign_key_checks = 1;');
}
exports.dropTables = dropTables;
async function seed(knex) {
    await knex('incore').insert({
        id_secret: crypto.randomBytes(32).toString('hex'),
    });
    const countryRepository = new incore_repository_factory_1.IncoreApiRepositoryFactory(new country_1.Country());
    const cityRepository = new incore_repository_factory_1.IncoreApiRepositoryFactory(new city_1.City());
    const countryStateRepository = new incore_repository_factory_1.IncoreApiRepositoryFactory(new country_state_1.CountryState());
    const userRepository = new incore_repository_factory_1.IncoreApiRepositoryFactory(new user_1.User());
    await knex('countries').del();
    await knex('cities').del();
    await knex('country_states').del();
    const { states, cities } = places;
    const country = {
        name: 'Brasil',
        alpha_2_code: 'BR',
        alpha_3_code: 'BRA',
        status: incore_status_1.IncoreStatus.ACTIVE,
    };
    countryRepository.apiInstructions = {
        data: country,
    };
    const countryResponse = await countryRepository.create();
    const countryId = countryResponse.item.country_id;
    for (let i in states) {
        const stateJsonId = parseInt(i);
        const stateData = states[i];
        const state = {
            country_id: countryId,
            name: stateData.name,
            code: stateData.code,
            status: incore_status_1.IncoreStatus.ACTIVE,
        };
        countryStateRepository.apiInstructions = {
            data: state,
        };
        const stateResponse = await countryStateRepository.create();
        const stateId = stateResponse.item.country_state_id;
        const citiesList = cities.filter(ct => ct.state_id === stateJsonId);
        for (let x = 0; x < citiesList.length; x++) {
            const c = citiesList[x];
            if (c && c.name && c.name.trim()) {
                const city = {
                    country_id: countryId,
                    name: c.name,
                    status: incore_status_1.IncoreStatus.ACTIVE,
                    country_state_id: stateId,
                };
                cityRepository.apiInstructions = {
                    data: city,
                };
                await cityRepository.create();
            }
        }
    }
    //await knex('addr_groups').del()
    await knex('addr_groups').insert([
        {
            uid: 0,
            name: 'Default',
            status: 1,
            metadata_id: (0, crypto_1.randomUUID)(),
        },
        {
            uid: 0,
            name: 'Home',
            status: 1,
            metadata_id: (0, crypto_1.randomUUID)(),
        },
        {
            uid: 0,
            name: 'Work',
            status: 1,
            metadata_id: (0, crypto_1.randomUUID)(),
        },
    ]);
    //await knex('roles').del()
    await knex('roles').insert([
        {
            name: 'Admin',
            uniq_id: 'adm',
            description: '',
            editable: 0,
            deletable: 0,
            status: 1,
            metadata_id: (0, crypto_1.randomUUID)(),
        },
        {
            name: 'Members',
            uniq_id: 'members',
            description: '',
            editable: 0,
            deletable: 0,
            status: 1,
            metadata_id: (0, crypto_1.randomUUID)(),
        },
        {
            name: 'Users',
            uniq_id: 'users',
            description: 'Users',
            editable: 0,
            deletable: 0,
            status: 1,
            metadata_id: (0, crypto_1.randomUUID)(),
        },
    ]);
    for (let user of users) {
        const usr = {
            name: user.firstName + ' ' + user.lastName,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: 'asd',
            status: incore_status_1.IncoreStatus.ACTIVE,
            birth_date: user.birthDate,
            account_type: 'individual',
        };
        userRepository.apiInstructions = {
            data: usr,
        };
        await userRepository.signup();
    }
    for (let profession of professions) {
        await knex('professions').insert({
            name: profession,
            metadata_id: (0, crypto_1.randomUUID)(),
        });
    }
}
exports.seed = seed;
