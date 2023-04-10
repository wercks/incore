## Available languages, outros idiomas

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/jonatasemidio/multilanguage-readme-pattern/blob/master/README.pt-br.md)

# Incore

```text
Intelligent Core
```

Incore is an intelligent library that understands alone what you want through json instructions sent from the front and performs all the necessary queries, does joins, manage conflicts, updates, login, records, roles, claims, manage uploads, cryptography, manage products, addresses, zipcode, cities, states, pagination returning even the list of pages to be displayed, creates all routes easily

With Incore it is possible to have an API that would take a week to do in a few hours

It has two sides, a backend (this) and a front version, both talk to each other, but this backend version does not depend on the other

# Installation

```sh
npm install --save incore
```

# Setup

Create a new file called **Incore.json** in the same place as _package.json_ in the API root folder

**incore.json**

This Json structure implements the interface **IncoreConfig** of which it has 4 Environments: **development, production, test e preview**,
Each Environment implements the interface **IncoreConfigEnv**

Copy the code below and paste it in your incore.json and modify accordingly your needs

The **knex** property is a default knex configuration and accepts all parameters from it

The _accessTokenExpiresIn_ and _refreshTokenExpiresIn_ properties are expressed in seconds or string with time interval [zeit/ms](https://github.com/zeit/ms.js). Ex.: 60, "2 days", "10h", "7d"

```json
{
    "development": {
        "knex": {
            "client": "mysql",
            "connection": {
                "charset": "utf8",
                "timezone": "America/Sao_Paulo",
                "host": "localhost",
                "database": "my_database",
                "password": "123456",
                "port": 3306,
                "user": "root"
            },
            "pool": { "min": 2, "max": 10 },
            "migrations": {
                "directory": "src/databases/migrations",
                "tableName": "migrations"
            },
            "seeds": { "directory": "src/databases/seeds" }
        },
        "auth": {
            "accessTokenExpiresIn": "24h",
            "refreshTokenExpiresIn": "3d",
            "tokenSecretKey": "The secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA",
            "refreshTokenSecretKey": "...",
            "algorithm": "HS256"
        },
        "uploads": {
            "path": "/var/www/html/site/",
            "baseUrl": "http://example.com"
        },
        "routesRoles": {
            "/users/": ["admin"],
            "/create": ["*"],
            "/del": ["admin"],
            "/delete": ["admin"],
            "/signup": ["*"],
            "/v1/cars/create": ["admin"],
            "/users/create": ["admin"],
            "r:REGEX_PATTERN": ["admin"]
        },
        "newUsersRoles": ["users", "members"]
    },
    "test": {},
    "preview": {},
    "production": {}
}
```

In the **routesRoles** property it is possible to control the roles in routes in general, to control specific actions you will use the **roleMiddleware**. If you start and end a path in routeRoles with "/", example: "/users/" it means that to list everything it will be restricted, it will only list if it sends an ID

In **auth.algorithm** the same values used by JWT are accepted

```text
 "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" |
 "ES256" | "ES384" | "ES512" | "PS256" | "PS384" | "PS512" | "none"
```

By default, **HS256 (HMAC - SHA256)** is set

After the first run a _knexfile.js_ file will be generated

# Creating tables, routes in few lines

```typescript
const app = async () => {
    const app = express()
    let server: Server

    const port = PORT || 3000

    // ---| Required |---

    const env = process.env.NODE_ENV || 'development'

    // Use after: Incore.isTest | Incore.isDev | Incore.isProd | Incore.isPreview
    Incore.env = IncoreEnv[env] || IncoreEnv.development

    // It creates tables, routes, data and more
    await Incore.bootstrap()

    // Set version path or just /
    app.use('/v1', Incore.router)

    // ---| Required |---

    app.listen(port, () => {
        console.log(`Server is running on PORT: ${port}`)
    })
}

export default app
```

A complete api was created with just these lines above, with authentication, user tables already with users in it, products, addresses, cities and states, currently with all cities and states in Brazil

The test users created have the password **asd**

After these lines above, it is already possible to make general requests, registrations, uploads, authentication and others

Here we are using local address **http://localhost:3000** for examples

# What are Instructions and actions?

Incore works through instructions sent in JSON or query in GET requests, most instructions can be sent in the GET method, example: **?limit=10&offset=0&id=any&page=1**

To allow sending complex instructions it is possible to make READ requests using **POST**

### Instruções

| Property         | Type      | Description                                                                                                                                                                                                                        |
| :--------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`         | `string`  | CREATE, READ, UPDATE, PATCH, DELETE, LOGIN, LOGOUT, SIGNUP, REFRESH                                                                                                                                                                |
| `updatePassword` | `object`  | To update passwords on updates                                                                                                                                                                                                     |
| `filters`        | `array`   | Filters with operators =, !=, >, <, <=, >=                                                                                                                                                                                         |
| `limit`          | `string`  | Limit of results per request                                                                                                                                                                                                       |
| `offset`         | `integer` | Initial position from which to return results                                                                                                                                                                                      |
| `id`             | `string`  | Encrypted item id for READ, UPDATE (required), DELETE (required)                                                                                                                                                                   |
| `first`          | `boolean` | **true** returns the first item of the result                                                                                                                                                                                      |
| `count`          | `boolean` | **true** to quickly get the total items for this requisition                                                                                                                                                                       |
| `embed`          | `string`  | **{"embed": "media"}** Returns relations in array or object form in a separate property in the response, this instruction replaces complex JOINS. relations are configured inside models, read more below                          |
| `search`         | `object`  | **{"search": {"term": "abc", "in": ["name", "email"]}}** **IncoreApiSearchInstruction** object to perform searches                                                                                                                 |
| `data`           | `object`  | Item data to be created or updated, **mandatory** in CREATE, UPDATE and PATCH actions                                                                                                                                              |
| `metadata`       | `array`   | array with **name and val** to be inserted or updated in metadata table simultaneously                                                                                                                                             |
| `page`           | `integer` | Pagination, current page number                                                                                                                                                                                                    |
| `totalPages`     | `integer` | Pagination, total number of pages                                                                                                                                                                                                  |
| `order`          | `object`  | Sort results by asc or desc                                                                                                                                                                                                        |
| `passwordField`  | `string`  | Login, when using a table that does not have the default field name "password"                                                                                                                                                     |
| `conflict`       | `array`   | Array with object **field**, **op** (operator) and **message**, used in SIGNUP to block user registration if the same data already exists and returns **"message"**. The **op** property is optional if the operator is equal to = |
| `login`          | `string`  | Data to authenticate and log in, email, telephone or any other data from the users table                                                                                                                                           |
| `password`       | `string`  | Password for LOGIN, SIGNUP or if sent in UPDATE will be encrypted automatically                                                                                                                                                    |

# Authentication

## Knowing the role object

To know how to apply the roles in routes, in middleware and others, let's see what are the
role object properties

| Parameter     | Type     | Description                                                                                                 |
| :------------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| `role_id`     | `string` | Encrypted Identification                                                                                    |
| `name`        | `string` | Name, example **Moderators**                                                                                |
| `uniq_id`     | `string` | Unique identifier, this is what you will use in **routesRoles** and in **newUsersRoles** in **incore.json** |
| `description` | `string` | Description                                                                                                 |

## Creating, updating and removing roles

```http
Authorization bearer TOKEN
```

```http
POST /roles/create (application/json)
```

```JSON
{
    "date": {
        "name": "Moderators",
        "uniq_id": "moderators",
        "description": "Moderators group"
    }
}
```

With this we can create our roles and leave them in storage to assign them to users

## Assign or remove a user role

Have the role and user ID "on hands"

```http
  Authorization bearer TOKEN
```

```http
  POST /users/roles/create (application/json)
```

```JSON
  {
    "data": {
        "role_id": "...",
        "uid": "..."
    }
  }
```

**Deleting**

```http
   DELETE /users/roles/del?id=ENCRYPTED_ID
```

Protect this route in the **incore.json** file in **routesRoles** delegating who can create or add users, add these

```text
"/users/roles/create"
"/users/roles/del"
"/users/roles/update"
```

To return the user's roles when for example doing login, just send the instruction **{"embed":"roles.[role]"}**

It is always necessary to send the embed like **roles.[role]** so that it is possible to access the role object later in the response: **data.item.roles[0].role.uniq_id**

To send more than one relation in the embed statement, do this:

```json
{
    "embed": "[media, roles.[role], addresses.[district,city,state]]"
}
```

In Incore, a user can have more than one address per group, for example home, work and others

# Authenticating

```http
POST http://localhost:3000/v1/auth/login
```

```json
{
    "login": "email@example.com",
    "password": "123456",
    "embed": "[media, roles.[role], addresses.[district,city,state]]"
}
```

**[RESPONSE]**

```JSON
{
	"data": {
		"item": {
			"uid": "ENCRYPTED_ID",
			"name": "John John",
			"first_name": "John",
			"last_name": "John",
			"[...]": "[...]",

            "addresses": [
                {
                    "[...]": "[...]",
                    "city": {},
                    "state": {},
                    "district": {},
                }
            ],
            "roles": [
                {
                    "[...]": "[...]"
                }
            ],
            "media": [
                {
                    "[...]": "[...]"
                }
            ]
		},
		"code": 200,
		"token": {
			"data": "...",
			"expiresIn": "24h"
		},
		"refreshToken": {
			"data": "...",
			"expiresIn": "3d"
		}
	},
	"message": ""
}
```

Keep in mind that only "addresses", "roles" and "media" were returned because they were all sent in the "embed" statement

The response implements the **IncoreResponse<IncoreApiResponse\<T\>>** interface

## Refresh the token with refreshToken

```http
POST http://localhost:3000/v1/auth/refresh
```

Send the refresh token in the Authorization bearer header

# Structure created by Incore

After running **await Incore.bootstrap()** for the first time the following structure was created internally

-   TABLES
    -   metadata
    -   users (contento 30 users (password: asd))
    -   media (for video and image, see uploads bellow)
    -   countries
    -   country_states
    -   cities
    -   addr_groups
    -   addresses
    -   districts
    -   products
    -   products_categories
    -   categories
    -   tags
    -   notifications
    -   roles (contento: admin, members, users)
    -   user_roles
    -   coupons
    -   professions
    -   cart
    -   cart_items
    -   merchants_config
-   ROUTES
    -   /metadata
    -   /auth
    -   /data
    -   /media
    -   /users
    -   /roles
    -   /users/roles
    -   /products
    -   /products/categories
    -   /categories
    -   /tags
    -   /cart
    -   /cart/items
    -   /merchant/config
    -   /notifications
    -   /countries
    -   /countries/states
    -   /countries/states/cities
    -   /countries/states/cities/districts
    -   /address
    -   /address/zipcode
    -   /address/groups
    -   /notifications
    -   /coupons
    -   /professions

Every route created by Incore has CRUD endpoints

**CRUD example**

```text
http://localhost:3000/v1/users
http://localhost:3000/v1/users/create
http://localhost:3000/v1/users/update
http://localhost:3000/v1/users/update/1
http://localhost:3000/v1/users/del
http://localhost:3000/v1/users/del/1
```

# How to create tables in the database?

You can create your tables any way you want, the only requirement is that all your tables have these required fields otherwise it will give errors

**Required fields**

```text
metadata_id
created_at
updated_at
status (default 1 (IncoreStatus.ACTIVE))
```

These don't need to be defined in your models as they are already part of the **IncoreModel** from which your models will extend

If you are creating your tables using knex migration, you can use Incore's helper function called **tableDefaults** to create default data for each table, this function has the following structure

```typescript
export const tableDefaults = (knex: Knex, table: Knex.CreateTableBuilder) => {
    table.string('metadata_id').nullable()
    table.dateTime('created_at').defaultTo(knex.fn.now())
    table.dateTime('updated_at').nullable()
    table.integer('status', 10).notNullable().defaultTo(IncoreStatus.ACTIVE)
    table.engine('InnoDB')
    table.charset('utf8mb4')
    table.collate('utf8mb4_0900_ai_ci')
}
```

If your logic has fields that are repeated then use the DRY pattern with this function, copy it and also add your own default fields without changing the ones that are already defined there, change its name so as not to conflict with the Incore standard

**In practice within migration**

```typescript
const hasTable = await knex.schema.hasTable('my_table')

if (!hasTable) {
    await knex.schema.createTable('my_table', table => {
        table.bigIncrements('my_table_id').unsigned().primary()
        // table....

        // Helper to create default data
        tableDefaults(knex, table)
    })
}
```

Repeat for each table

[`Read more about knex migrations`](https://knexjs.org/guide/migrations.html#migration-cli)

# Creating your routes and using middleware

First of all, you need to know that Incore has 3 middleware for access control, they are

```text
authMiddleware | roleMiddleware | claimMiddleware
```

authMiddleware is for controlling authentication token and refreshToken (JWT), roleMiddleware
is for granting access e.g. only to admin or other, claimMiddleware is for claims, e.g. granting access only to users of a certain age or others

Before creating a route, you need to create a Model

Each model necessarily needs to extend **IncoreModel**, this is also an **objection** model

If you still don't know **objection**, this is a powerful ORM that together with **knex** helps a lot

[`https://vincit.github.io/objection.js/`](https://vincit.github.io/objection.js/)

## Basic model

Each model needs to have these two static properties, they are mandatory

```text
tableName
idColumn
```

```typescript
export class Car extends IncoreModel {
    car_id?: number

    color: string

    model: string

    static tableName = 'cars'

    static idColumn = 'car_id'
}

export type CarInterface = IncoreModelInterface<Car>
```

See how simple it is to create an interface for this model, just below each model write:

```typescript
export type CarInterface = IncoreModelInterface<Car>
```

After that you can use this interface to type your data

```typescript
const someData: CarInterface
```

**RECAP**

-   Create a model class
    -   set its properties
    -   set static tableName
    -   set static idColumn
    -   export type as above

If you want to define a json schema for validation, write it inside the model

```typescript
static get jsonSchema() {
    return {
        type: 'object',
        required: ['color', 'model'],
        properties: this.properties({
            car_id: { type: 'integer' },
            color: { type: 'string' },
            model: { type: 'string' },
        }),
    }
}
```

Important that "properties" calls **this.properties** to allow Incore to add the default properties **_created_at_, _updated_at_, _status_** and
**_metadata_id_**

## Relations for the "embed" statement

For these relationships, Incore uses **objection.js**

[`Read more here about relations`](https://vincit.github.io/objection.js/api/model/static-properties.html#static-relationmappings)

**Example inside the model, needs to be static**

Imagine that when I make a list of cars I want the driver and also the car documents, so imagine that I have already created another model **Driver** and another CarData

Imagine that I want only one driver of the car, for that I use the following

**IncoreModel.HasOneRelation**

```typescript
// Resulting in:
const driver = data.item.driver
```

What if I want more drivers to return?

**IncoreModel.HasManyRelation**

```typescript
// Resulting in:
data.item.driver.forEach(d => {
    console.log(d.name)
})
```

**Inside the model write the following:**

```typescript
static relationMappings = {
    driver: {
        relation: IncoreModel.HasOneRelation,
        modelClass: Driver,
        join: {
            from: 'car.car_id',
            to: 'driver.car_id',
        },
    },
    docs: {
        relation: IncoreModel.HasManyRelation,
        modelClass: CarData,
        join: {
            from: 'car.car_id',
            to: 'docs.car_id',
        },
    },
}
```

**Quick Info:**

```text
Incore always returns "data.item" for results with "first" statement
or with instruction **"id"** and returns "data.items" in plural
for multiple results
```

After that, you won't have to worry about having to write queries with JOINS anymore, you'll just do it like this when sending the request:

```JSON
{
    "embed": "driver"
}
```

or to include docs, i.e. more than one relation

```JSON
{
    "embed": "[driver,docs]"
}
```

or if you still want to return relations from other models as well, write like this:

```JSON
{
    "embed": "[driver.[other, etc], docs]"
}
```

Note that "docs" uses **IncoreModel.HasManyRelation** which will return an array:

```JSON
{
	"data": {
		"item": {
			"...": "...",

            "driver": {
                "...": "...",
            },
            "docs": [
                {
                    "...": "...",
                }
            ]
		}
	},
}
```

```text
data.item.driver
data.item.docs[0]
```

It is possible to do many more things within this model, keep reading

Now that we know how to create the model, let's create a route

You can write your routes for example in a file called **routes.ts**. Done that we will insert our routes in it, which will be just an array, we will create a route for our model **Car** that was created above

```typescript
import { IncoreRouteConfig } from 'incore'

export const myRoutes: IncoreRouteConfig[] = [
    {
        path: '/cars',
        model: Car,
    },
]
```

That's it, that's it for now, remembering that you need to follow the **IncoreRouteConfig** type.

_Keep reading to learn how to use middleware in routes_

Now let's go back to where we initialized everything and just above await **Incore.bootstrap()**, register your routes, see:

```typescript
// const app = express()
// [...]

// Registre suas rotas
Incore.createRoutes(myRoutes)

await Incore.bootstrap()
```

After that we can already make requests on this route

```text
http://localhost:3000/v1/cars
http://localhost:3000/v1/cars/create
http://localhost:3000/v1/cars/update
http://localhost:3000/v1/cars/del
http://localhost:3000/v1/cars/patch
```

**Attention:**

Do not write /create, /update, /del or /patch, just write "/cars" Incore will create them all automatically

```http
GET http://localhost:3000/v1/cars
```

```json
{
    "first": true,
    "filters": [[["color", "!=", "blue"]]],
    "embed": "[driver,docs]"
}
```

```http
POST http://localhost:3000/v1/cars/create
```

```json
{
    "data": {
        "color": "blue",
        "model": "luxury"
    }
}
```

```http
PUT http://localhost:3000/v1/cars/update
```

or if not send the "id" in the instruction

```http
PUT http://localhost:3000/v1/cars/update/[ENCRYPTED_ID]
```

```json
{
    "id": "ENCRYPTED_ID",
    "data": {
        "color": "blue",
        "model": "luxury"
    }
}
```

Internally Incore created the following endpoints for "cars"

```http
GET      http://localhost:3000/v1/cars/
POST     http://localhost:3000/v1/cars/
POST     http://localhost:3000/v1/cars/create
UPDATE   http://localhost:3000/v1/cars/update
DELETE   http://localhost:3000/v1/cars/del
PATCH    http://localhost:3000/v1/cars/patch
```

## Control route with middleware

For each action it is possible to define different middleware, but first let's see how the names of the actions are written inside Incore

The actions come from the **IncoreAction** type and these below are the ones available at the moment

```text
'CREATE' | 'READ' | 'UPDATE' | 'PATCH' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'SIGNUP' | 'REFRESH'
```

Now imagine that you don't want an unauthenticated user to register and update cars (we are in the Car model)

```typescript
const handlers: IncoreApiRouteHandler[] = [
    {
        handler: authMiddleware,
    },
    {
        handler: myOtherMiddleware,
        args: ['arg1'],
    },
]

const middleware: IncoreApiRouteMiddleware[] = [
    {
        action: 'CREATE',
        middleware: handlers,
    },
    {
        action: 'UPDATE',
        middleware: handlers,
    },
    {
        action: 'DELETE',
        middleware: handlers,
    },
]
```

Above we already have our middleware that can now be added to as many routes as we want

As you may have noticed in **"myOtherMiddleware"**, it is possible to send arguments that will be received in the middleware: **(arg1, arg2, arg3)**

### Adding middleware to routes

```typescript
export const myRoutes: IncoreRouteConfig[] = [
    {
        path: '/cars',
        model: Car,
        middleware: middleware,
    },
    {
        path: '/other/path',
        model: OtherModel,
        middleware: middleware,
    },
]
```

From now on when trying to register a car, update or delete it will only be possible if it is authenticated due to the middleware **authMiddleware**

_Keep reading to learn how to create your own middleware_

## How to use roleMiddleware and claimMiddleware

```typescript
// ROLES
// Must return RoleResponse type
// we create a separate function to stay organized
const rolesChecker: RoleMiddleware = (roles, instructions): RoleResponse => {
    // Não permitir caso o usuário atual não seja admin
    if (!roles.find(r => r.role.uniq_id === 'admin')) {
        return {
            granted: false,
            code: IncoreResponseCode.FORBIDDEN,
            message: 'message...',
        }
    }

    return {
        granted: true,
    }
}

// CLAIMS
const claimsChecker: Claim = (user, instructions): ClaimResponse => {
    const birthDate = new Date(user.birth_date)
    const acceptOnlyNewUsers = new Date(user.created_at)

    if (...) {
        return {
            granted: false,
            code: IncoreResponseCode.FORBIDDEN,
            message: 'message...',
        }
    }

    return {
        granted: true,
    }
}

// We send rolesChecker and claimsChecker as an argument to the middleware
const handlers: IncoreApiRouteHandler[] = [
    {
        handler: authMiddleware,
    },
    {
        handler: roleMiddleware,
        args: [rolesChecker],
    },
    {
        handler: claimMiddleware,
        args: [claimsChecker],
    }
]

const middleware: IncoreApiRouteMiddleware[] = [
    {
        action: 'CREATE',
        middleware: handlers,
    },
    {
        action: 'UPDATE',
        middleware: handlers,
    },
    {
        action: 'DELETE',
        middleware: handlers,
    },
]
```

Now assign **"middleware"** on as many routes as you want as seen above

## Create your own middleware

A middleware must implement the **IncoreApiMiddleware** type returning a standard express middleware

```text
must return
(req, res, nex) => {}
```

If you need to respond prematurely and block normal execution for some reason send **IncoreResponse.json** passing null as the data, an http status, the message and **res** or if everything is ok **next()** to continue as shown below

```typescript
export const myMiddleware: IncoreApiMiddleware = (arg1: string) => {
    return (req: IncoreExpressRequest, res: Response, next: NextFunction) => {

        if (...) {
            IncoreResponse.json(
                null,
                IncoreResponseCode.FORBIDDEN,
                'Message...!',
                res
            )
            return
        }

        // continue normally
        next()
    }
}
```

Use your new middleware same as shown with others, authMiddleware, roleMiddleware and claimMiddleware passing arguments if needed

# Using your own queries

## Calling methods inside your models by instruction via JSON

Imagine sending a JSON property with an array as a value and Incore calling a method inside your model with that name and the array arguments

Let's create a method called **doSomething** inside our model expecting 3 arguments, a string, another number and another boolean

Inside here you can create your own queries, they are knex normal, the difference is that you don't need to pass table name because the model already does that, also use all objection facilities

```typescript
class MyModel extends IncoreModel {
    prop: string

    static tableName = 'my_table'

    static idColumn = 'id_col'

    async doSomething(
        arg1: string,
        arg2: number,
        arg3: boolean
    ): Promise<IncoreApiResponse<MyModelInterface> | null> {
        const { data, params, offset, page } = this.instructions()

        const expressRequest = this.repository().request

        // Write your own queries
        // If you need a query from another table, use its model
        const queryResult = await MyModel.query()
            .where('..', '..')
            .withGraphFetched(this.instructions().embed ?? '')

        // Stop and return your own answer
        if (data.email == 'abc@example.com') {
            return {
                code: IncoreResponseCode.FORBIDDEN,
                message: '...',
            }
        } else {
            // return your own result
            // use item in the singular if it is a single result
            // for example when using .first()

            // Calculate the total results
            const total = 50

            const navigation = this.navigation(total, page)

            return {
                code: IncoreResponseCode.OK,
                items: queryResult,
                navigation: navigation,
            }
        }

        // Change the instructions if needed
        const newInstructions = {
            ...this.instructions(),
            first: true,
        }

        // Pass the new instructions to the repository
        this.repository().apiInstructions = newInstructions

        // continue normally
        return null
    }
}

export type MyModelInterface = IncoreModelInterface<MyModel>
```

### Other properties that can be returned

```typescript
return {
    code: IncoreResponseCode.OK,
    redirectTo: 'http://example.com',
    html: '<DOCTYPE html>...html code',
    js: 'JavaScript code',
    text: 'Text code',
}
```

Now let's call this method directly through JSON

```http
POST http://localhost:3000/v1/my/endpoint/create
```

```json
{
    "doSomething": ["that simple", 1, true],

    "data": {
        "name": "John",
        "email": "abc@example.com"
    }
}
```

# Uploads

With Incore it is very easy to deal with uploads, for that there is already a table called **media** for images and videos

To receive uploads there are two unique steps

### 1) Set path and baseUrl in incore.json file

```json
{
    "uploads": {
        "path": "/var/www/html/site/",
        "baseUrl": "http://example.com"
    }
}
```

### 2) Adicionar dois middleware um após o outro

```text
uploadService
mediaMiddleware
```

```typescript
import { authMiddleware, uploadService, mediaMiddleware } from 'incore'

const uploadMiddlewareHandlers: IncoreApiRouteHandler[] = [
    {
        handler: authMiddleware, // <--- if you need authentication
    },
    {
        handler: uploadService, // <--- first this
    },
    {
        handler: mediaMiddleware, // <--- then this
    },
]

const uploadMiddleware: IncoreApiRouteMiddleware[] = [
    {
        action: 'CREATE',
        middleware: uploadMiddlewareHandlers,
    },
    {
        action: 'UPDATE',
        middleware: uploadMiddlewareHandlers,
    },
]

// Assign on your routes that need uploading

export const myRoutes: IncoreRouteConfig[] = [
    {
        path: '/cars',
        model: Car,
        middleware: uploadMiddleware,
    },
    {
        path: '/cars/docs',
        model: Docs,
        middleware: uploadMiddleware,
    },
]
```

In general you will only need to upload in CREATE and UPDATE actions, that is, POST and UPDATE

That's all you need! To get the images just send in the "embed" instruction like this

```json
{
    "embed": "media"
}
```

Will return all uploads with results

```typescript
data.item.media.foreach(m => {
    console.log(m.url)
})
```

## most necessary media properties

| Property   | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `media_id` | `string` | Encrypted ID                |
| `source`   | `string` | path to file on disk        |
| `url`      | `string` | Full URL for image or video |

### Others

```text
type (1=image, 2=video), width, height, x, y, duration,
color_filter, format, mimetype, resolution, aspect_ratio,
bit_rate, frame_rate, channels, sampling_rate, commercial_name,
compression_mode, bit_depth, size
```
