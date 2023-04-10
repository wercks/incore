"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incoreRoutes = void 0;
const user_1 = require("../models/user");
const address_1 = require("../models/address");
const cart_item_1 = require("../models/cart-item");
const category_1 = require("../models/category");
const city_1 = require("../models/city");
const country_state_1 = require("../models/country-state");
const merchant_config_1 = require("../models/merchant-config");
const metadata_1 = require("../models/metadata");
const notification_1 = require("../models/notification");
const product_1 = require("../models/product");
const product_category_1 = require("../models/product-category");
const role_1 = require("../models/role");
const tag_1 = require("../models/tag");
const zipcode_1 = require("../models/zipcode");
const media_1 = require("../models/media");
const any_1 = require("../models/any");
const auth_middleware_1 = require("../middleware/auth-middleware");
const upload_service_1 = require("../middleware/upload-service");
const media_middleware_1 = require("../middleware/media-middleware");
const user_role_1 = require("../models/user_role");
const cart_1 = require("../models/cart");
const country_1 = require("../models/country");
const district_1 = require("../models/district");
const addr_group_1 = require("../models/addr-group");
const coupon_1 = require("../models/coupon");
const profession_1 = require("../models/profession");
const middleware = [
    {
        action: 'CREATE',
        middleware: [
            {
                handler: auth_middleware_1.authMiddleware,
                args: [],
            },
        ],
    },
    {
        action: 'UPDATE',
        middleware: [
            {
                handler: auth_middleware_1.authMiddleware,
            },
        ],
    },
    {
        action: 'PATCH',
        middleware: [
            {
                handler: auth_middleware_1.authMiddleware,
            },
        ],
    },
    {
        action: 'DELETE',
        middleware: [
            {
                handler: auth_middleware_1.authMiddleware,
            },
        ],
    },
];
const defaultUploadMiddleware = [
    {
        handler: auth_middleware_1.authMiddleware,
    },
    {
        handler: upload_service_1.uploadService,
    },
    {
        handler: media_middleware_1.mediaMiddleware,
    },
];
const uploadMiddleware = [
    {
        action: 'CREATE',
        middleware: defaultUploadMiddleware,
    },
    {
        action: 'REFRESH',
        middleware: [
            {
                handler: auth_middleware_1.authMiddleware,
            },
        ],
    },
    {
        action: 'UPDATE',
        middleware: defaultUploadMiddleware,
    },
    {
        action: 'DELETE',
        middleware: defaultUploadMiddleware,
    },
    {
        action: 'SIGNUP',
        middleware: [
            {
                handler: upload_service_1.uploadService,
            },
            {
                handler: media_middleware_1.mediaMiddleware,
            },
        ],
    },
];
exports.incoreRoutes = [
    {
        path: '/metadata',
        model: metadata_1.Metadata,
        middleware: middleware,
    },
    {
        path: '/address',
        model: address_1.Address,
        middleware: middleware,
    },
    {
        path: '/address/zipcode',
        model: zipcode_1.ZipCode,
        middleware: middleware,
    },
    {
        path: '/address/groups',
        model: addr_group_1.AddrGroup,
        middleware: middleware,
    },
    {
        path: '/countries',
        model: country_1.Country,
        middleware: middleware,
    },
    {
        path: '/countries/states',
        model: country_state_1.CountryState,
        middleware: middleware,
    },
    {
        path: '/countries/states/cities',
        model: city_1.City,
        middleware: middleware,
    },
    {
        path: '/countries/states/cities/districts',
        model: district_1.District,
        middleware: middleware,
    },
    {
        path: '/notifications',
        model: notification_1.Notification,
        middleware: middleware,
    },
    {
        path: '/merchant/config',
        model: merchant_config_1.MerchantConfig,
        middleware: middleware,
    },
    {
        path: '/cart',
        model: cart_1.Cart,
        middleware: middleware,
    },
    {
        path: '/cart/items',
        model: cart_item_1.CartItem,
        middleware: middleware,
    },
    {
        path: '/tags',
        model: tag_1.Tag,
        middleware: middleware,
    },
    {
        path: '/categories',
        model: category_1.Category,
        middleware: middleware,
    },
    {
        path: '/products/categories',
        model: product_category_1.ProductCategory,
        middleware: middleware,
    },
    {
        path: '/products',
        model: product_1.Product,
        middleware: uploadMiddleware,
    },
    {
        path: '/roles',
        model: role_1.Role,
        middleware: middleware,
    },
    {
        path: '/users',
        model: user_1.User,
        middleware: uploadMiddleware,
    },
    {
        path: '/users/roles',
        model: user_role_1.UserRole,
        middleware: uploadMiddleware,
    },
    {
        path: '/media',
        model: media_1.Media,
        middleware: middleware,
    },
    {
        path: '/auth',
        model: user_1.User,
        middleware: uploadMiddleware,
    },
    {
        path: '/data',
        model: any_1.AnyModel,
        middleware: middleware,
    },
    {
        path: '/notifications',
        model: notification_1.Notification,
        middleware: middleware,
    },
    {
        path: '/professions',
        model: profession_1.Profession,
        middleware: middleware,
    },
    {
        path: '/coupons',
        model: coupon_1.Coupon,
        middleware: middleware,
    },
];
