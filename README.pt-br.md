## Available languages

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/wercks/incore/blob/master/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/wercks/incore/blob/master/README.pt-br.md)

# Incore

Significado do nome:

```text
Intelligent Core
```

Incore é uma biblioteca inteligente que entende sozinha o que você quer através de instruções JSON enviadas do front e executa todas as queries necessárias, faz joins, gerencia conflitos, updates, login, cadastros, roles, claims, gerencia uploads, criptografa, gerencia produtos, endereços, cep, cidades, estados, faz paginação retornando até mesmo a lista de números de páginas a ser exibida, cria todas as rotas facilmente

Com Incore é possível ter uma api que levaria uma semana para fazer em poucas horas

Possui dois lados, um backend (este) e uma versão front, ambos conversam entre si, mas esta versão backend não depende da outra

# Instalação

```sh
npm install --save incore
```

# Setup

Crie um novo arquivo chamado **incore.json** no mesmo local que está o _package.json_ na pasta root da api

**incore.json**

Esta estrutura JSON implementa a interface **IncoreConfig** da qual possui 4 environments: **development, production, test e preview**,
cada environment implementa a interface **IncoreConfigEnv**

Copie o código abaixo e cole no seu incore.json e modifique de acordo suas necessidades

A propriedade **knex** é uma configuração knex padrão e aceita todos os parâmetros dele

As propriedades _accessTokenExpiresIn_ e _refreshTokenExpiresIn_ são expressadas em segundos ou string com intervalo de tempo [zeit/ms](https://github.com/zeit/ms.js). Ex.: 60, "2 days", "10h", "7d"

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

Na propriedade **routesRoles** é possível controlar as roles em rotas de forma geral, para controlar em ações especificas você usará o **roleMiddleware**. Se começar e terminar um path em routeRoles com "/", exemplo: "/users/" isso significa que para listar tudo será restrito, somente vai listar se enviar um ID

Em **auth.algorithm** são aceitos os mesmos valores usados pelo JWT

```text
 "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" |
 "ES256" | "ES384" | "ES512" | "PS256" | "PS384" | "PS512" | "none"
```

Por padrão está definido **HS256 (HMAC - SHA256)**

Depois da primeira execução será gerado um arquivo
_knexfile.js_

# Criando tabelas, rotas em poucas linhas

```typescript
const app = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let server: Server;

  const port = PORT || 3000;

  // ---| Obrigatório |---

  const env = process.env.NODE_ENV || "development";

  // Use depois: Incore.isTest | Incore.isDev | Incore.isProd | Incore.isPreview
  Incore.env = IncoreEnv[env] || IncoreEnv.development;

  // Cria tabelas, rotas, dados e outros
  await Incore.bootstrap();

  // Defina o path da versão ou apenas /
  app.use("/v1", Incore.router);

  // ---| Obrigatório |---

  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  });
};

export default app;
```

Uma api completa foi criada com apenas estas linhas acima, com autenticação, tabelas de usuários já com usuários nela, produtos, endereços, cidades e estados, no momento já com todas cidades e estados do Brasil

Os usuários criados de teste possuem a senha **asd**

Após essas linhas acima já é possível fazer requisições gerais, cadastros, uploads, autenticação entre outros

Aqui estaremos usando o endereço local **http://localhost:3000** para exemplos

# O que são instruções e actions

O Incore funciona através de instruções enviadas em JSON ou na query em requisições GET, a maioria das instruções podem ser enviadas no método GET, exemplo: **?limit=10&offset=0&id=any&page=1**

Para permitir enviar instruções complexas é possível fazer requisições de leitura READ usando **POST**

### Instruções

| Propriedade      | Tipo      | Descrição                                                                                                                                                                                                                               |
| :--------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`         | `string`  | CREATE, READ, UPDATE, PATCH, DELETE, LOGIN, LOGOUT, SIGNUP, REFRESH                                                                                                                                                                     |
| `updatePassword` | `object`  | Para atualizar senhas em updates                                                                                                                                                                                                        |
| `filters`        | `array`   | Filtros com operadores =, !=, >, <, <=, >=                                                                                                                                                                                              |
| `limit`          | `string`  | Limite de resultados por requisição                                                                                                                                                                                                     |
| `offset`         | `integer` | Posição inicial de onde retornar resultados                                                                                                                                                                                             |
| `id`             | `string`  | Id criptografado do item para READ, UPDATE (obrigatório), DELETE (obrigatório)                                                                                                                                                          |
| `first`          | `boolean` | **true** retorna o primeiro item do resultado                                                                                                                                                                                           |
| `count`          | `boolean` | **true** para obter rapidamente o total de itens desta requisição                                                                                                                                                                       |
| `embed`          | `string`  | **{"embed": "media"}** Retorna relações em forma de array ou objeto em uma propriedade separada na resposta, essa instrução substitui JOINS complexos. As relações são configuradas dentro das models, leia mais abaixo                 |
| `search`         | `object`  | **{"search": {"term": "abc", "in": ["name", "email"]}}** Objeto do tipo **IncoreApiSearchInstruction** para realizar buscas                                                                                                             |
| `data`           | `object`  | Dados do item a ser criado ou atualizado, **obrigatório** em CREATE, UPDATE e PATCH actions                                                                                                                                             |
| `metadata`       | `array`   | array com **name e val** para serem inseridos ou atualizados na tabela metadata simultaneamente                                                                                                                                         |
| `page`           | `integer` | Paginação, número atual da página                                                                                                                                                                                                       |
| `totalPages`     | `integer` | Paginação, número total de páginas                                                                                                                                                                                                      |
| `order`          | `object`  | Organizar os resultados por asc ou desc                                                                                                                                                                                                 |
| `passwordField`  | `string`  | Login, ao usar uma tabela que não possua o nome do campo padrão "password"                                                                                                                                                              |
| `conflict`       | `array`   | Array com objeto **field**, **op** (operador) e **message**, usado em SIGNUP para bloquear o cadastro do usuário caso já exista os mesmos dados e retorna **"message"**. A propriedade **op** é opcional caso o operador seja igual a = |
| `login`          | `string`  | Dado para autenticar e entrar, email, telefone ou qualquer outro dado da tabela users                                                                                                                                                   |
| `password`       | `string`  | Senha de LOGIN, SIGNUP ou caso seja enviado em UPDATE será criptografado automaticamente                                                                                                                                                |
| `loginFields`    | `array`   | Caso o login não seja por email ou deseja verificar em mais campos que não seja apenas "email", exemplo: **{"loginFields": ["email", "phone_number"]}**                                                                                 |
| `storage`        | `object`  | Objeto com **path** e **name** para salvar (CREATE), atualizar (UPDATE) ou ler (READ) dados em arquivos e não utilizar o banco de dados. O path não deve ser absoluto, esse arquivo será salvo dentro de **./app_data** na raiz da api  |
| `crypt`          | `array`   | Caso queira criptografar um dado de um ou mais campos, em caso de password não usar esta, use as instruções acima especificas para isso                                                                                                 |

# Autenticação

## Conhecendo o objeto role

Para saber como aplicar as roles nas rotas, em middleware e outros, vamos ver quais são as
propriedades do objeto Role

| Parameter     | Type     | Description                                                                                            |
| :------------ | :------- | :----------------------------------------------------------------------------------------------------- |
| `role_id`     | `string` | Identificação criptografada                                                                            |
| `name`        | `string` | Nome, exemplo **Moderadorres**                                                                         |
| `uniq_id`     | `string` | Identificador único, é com este que usará em **routesRoles** e em **newUsersRoles** no **incore.json** |
| `description` | `string` | Descrição                                                                                              |

## Criando, atualizando e removendo roles

**Authorization bearer TOKEN**

```http
  POST http://localhost:3000/v1/roles/create
```

```JSON
  {
    "data": {
        "name": "Moderadores",
        "uniq_id": "moderadores",
        "description": "Grupo de moderadores"
    }
  }
```

Com isso podemos criar nossas roles e deixar guardadas para atribuí-las aos usuários

## Atribuir ou remover uma role do usuário

Tenha em "mãos" o ID da role e do usuário

**Authorization bearer TOKEN**

```http
  POST http://localhost:3000/v1/users/roles/create
```

```JSON
  {
    "data": {
        "role_id": "...",
        "uid": "..."
    }
  }
```

**Remover**

```http
  DELETE /users/roles/del?id=ID_CRIPTOGRAFADO
```

Proteja essa rota no arquivo **incore.json** em **routesRoles** delegando quem pode criar ou adicionar usuários, adicione estas

```text
"/users/roles/create"
"/users/roles/del"
"/users/roles/update"
```

Para retornar as roles do usuário ao fazer login por exemplo, basta enviar a instrução **"embed":"roles.[role]"**

É preciso sempre enviar o embed assim **roles.[role]** para que seja possível acessar o objeto role depois na resposta **data.item.roles[0].role.uniq_id**

Para enviar mais de uma relação na instrução embed, faça assim:

```json
{
  "embed": "[media, roles.[role], addresses.[district,city,state]]"
}
```

No Incore um usuário pode ter mais de um endereço por grupos, exemplo casa, trabalho e outros

# Autenticando

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
			"uid": "ID_CRIPTOGRAFADO",
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

Tenha em mente que só foram retornados "addresses", "roles" e "media" porque todas foram enviados na instrução "embed"

A resposta implementa a interface **IncoreResponse<IncoreApiResponse\<T\>>**

## Atualizar o token com refreshToken

```http
POST http://localhost:3000/v1/auth/refresh
```

Envie no header Authorization bearer o refresh token

# Cadastro de usuário

```http
POST http://localhost:3000/v1/auth/signup
```

```json
{
  "data": {
    "...": "..."
  },
  "conflict": [
    {
      "field": "email",
      "op": "=",
      "message": "Este email já existe"
    }
  ]
}
```

## Propriedades de usuário

Envie as seguintes propriedades em "data" no JSON

\* (obrigatório)

| Propriedade                    | Tipo      | Descrição                                                           |
| :----------------------------- | :-------- | :------------------------------------------------------------------ |
| `name`                         | `string`  | \* Nome do usuário                                                  |
| `first_name`                   | `string`  | Primeiro nome                                                       |
| `last_name`                    | `string`  | Sobrenome                                                           |
| `nickname`                     | `string`  | Apelido                                                             |
| `social_addr`                  | `string`  | (Não enviar) Criado automaticamente pelo Incore na hora do cadastro |
| `trade_name`                   | `string`  | Nome comercial                                                      |
| `corporate_name`               | `string`  | Razão Social                                                        |
| `company_open_date`            | `string`  | Data de abertura da empresa                                         |
| `company_activity_code`        | `string`  | Exemplo: CNAE                                                       |
| `company_legal_nature`         | `string`  | Natureza Jurídica                                                   |
| `account_type`                 | `string`  | **individual** ou **merchant**                                      |
| `company_capital`              | `integer` | Capital da empresa                                                  |
| `birth_date`                   | `string`  | \* Data de nascimento                                               |
| `phone_number`                 | `string`  | Número de telefone                                                  |
| `cpf`                          | `string`  | Cadastro de pessoas físicas                                         |
| `rg`                           | `string`  | Registro geral                                                      |
| `ein`                          | `string`  | Employer Identification Number                                      |
| `ssn`                          | `string`  | Número de Seguro Social                                             |
| `cnpj`                         | `string`  | Número de registro da empresa                                       |
| `email`                        | `string`  | \* Endereço de email                                                |
| `professional_document_number` | `string`  | Número de documento profissional                                    |
| `about`                        | `string`  | Sobre o usuário                                                     |
| `latitude`                     | `(10, 8)` | Latitude (decimal)                                                  |
| `longitude`                    | `(11, 8)` | Longitude (decimal)                                                 |
| `password`                     | `string`  | Senha                                                               |

A propriedade "conflict" é para definir campos dos quais não podem receber cadastro repetidos

Em "op" são operadores que podemos usar: **=, !=, >=, <, <=**

Imagine que não queremos que o mesmo número do seguro social se repita e nem o email

**Fazemos assim:**

Você pode omitir o operador se ele for **=**

```json
{
  "data": {
    "...": "..."
  },
  "conflict": [
    {
      "field": "email",
      "message": "Este email já existe"
    },
    {
      "field": "ssn",
      "message": "Este número já está cadastrado"
    }
  ]
}
```

Caso exista o Incore vai retornar **BAD_REQUEST (400)** com a mensagem definida

# O que entendemos até agora?

1. Entendemos que para fazer cadastro das coisas devemos enviar o objeto **"data"** e posso enviar opcionalmente a propriedade **"conflict"**

2. Também sabemos que para fazer UPDATE devemos enviar o objeto **"data"** e o ID do item no JSON (id) ou no path

3. Para fazer DELETE devemos enviar o ID do item no JSON (id) ou no path

# Estrutura criada pelo Incore

Depois da execução de **await Incore.bootstrap()** pela primeira vez a seguinte estrutura foi criada internamente

- TABELAS
  - metadata
  - users (contendo 30 users (password: asd))
  - media (for video and image, see uploads bellow)
  - countries
  - country_states
  - cities
  - addr_groups
  - addresses
  - districts
  - products
  - products_categories
  - categories
  - tags
  - notifications
  - roles (contento: admin, members, users)
  - user_roles
  - coupons
  - professions
  - cart
  - cart_items
  - merchants_config
- ROTAS
  - /metadata
  - /auth
  - /data
  - /media
  - /users
  - /roles
  - /users/roles
  - /products
  - /products/categories
  - /categories
  - /tags
  - /cart
  - /cart/items
  - /merchant/config
  - /notifications
  - /countries
  - /countries/states
  - /countries/states/cities
  - /countries/states/cities/districts
  - /address
  - /address/zipcode
  - /address/groups
  - /notifications
  - /coupons
  - /professions

Toda rota criada pelo Incore possui endpoints CRUD

**CRUD example**

```text
http://localhost:3000/v1/users
http://localhost:3000/v1/users/create
http://localhost:3000/v1/users/update
http://localhost:3000/v1/users/update/1
http://localhost:3000/v1/users/del
http://localhost:3000/v1/users/del/1
```

# Como criar tabelas no banco?

Você pode criar suas tabelas da maneira que quiser, a única exigência é que todas as suas tabelas possuam esses campos obrigatórios do contrário vai dar erros

**Campos obrigatórios**

```text
metadata_id
created_at
updated_at
status (default 1 (IncoreStatus.ACTIVE))
```

Esses não precisam ficar definidos na suas models pois já fazem parte da **IncoreModel** da qual suas models vão extender

Se estiver criando suas tabelas usando knex migration, você pode usar a função helper do Incore chamada **tableDefaults** para criar dados padrões para cada tabela, esta função possui a seguinte estrutura

```typescript
export const tableDefaults = (knex: Knex, table: Knex.CreateTableBuilder) => {
  table.string("metadata_id").nullable();
  table.dateTime("created_at").defaultTo(knex.fn.now());
  table.dateTime("updated_at").nullable();
  table.integer("status", 10).notNullable().defaultTo(IncoreStatus.ACTIVE);
  table.engine("InnoDB");
  table.charset("utf8mb4");
  table.collate("utf8mb4_0900_ai_ci");
};
```

Se na sua logica possui campos que se repetem então use o DRY pattern com essa função, copie ela e acrescente também os seus próprios campos padrões sem alterar os que já estão definidos ai, troque o nome dela para não conflitar com a padrão do Incore

**Na prática dentro da migration**

```typescript
const hasTable = await knex.schema.hasTable("my_table");

if (!hasTable) {
  await knex.schema.createTable("my_table", (table) => {
    table.bigIncrements("my_table_id").unsigned().primary();
    // table....

    // Helper para criar os dados padrões
    tableDefaults(knex, table);
  });
}
```

Repita para cada tabela

[`Leia mais sobre as migrations do knex`](https://knexjs.org/guide/migrations.html#migration-cli)

# Criando as suas rotas e usando middleware

Antes de mais nada você precisa saber que o Incore possui 3 middleware para controle de acesso, são eles

```text
authMiddleware | roleMiddleware | claimMiddleware
```

authMiddleware é para controlar o token de autenticação e refreshToken (JWT), roleMiddleware
é para liberar acesso por exemplo, apenas para admin ou outro, claimMiddleware é para claims, por exemplo liberar acesso apenas para usuários de uma certa idade ou outros

Antes de criar uma rota, você precisa criar uma Model

Cada model obrigatoriamente precisa extender **IncoreModel**, esta também é uma model **objection**

Se ainda não conhece **objection**, esta é uma ORM poderosa que juntamente com **knex** ajuda muito

[`https://vincit.github.io/objection.js/`](https://vincit.github.io/objection.js/)

## Model básica

Cada model precisa ter estas duas propriedades estáticas, são obrigatórias

```text
tableName
idColumn
```

```typescript
export class Car extends IncoreModel {
  car_id?: number;

  color: string;

  model: string;

  static tableName = "cars";

  static idColumn = "car_id";
}

export type CarInterface = IncoreModelInterface<Car>;
```

Veja como é simples criar uma interface para esta model, logo abaixo de cada model escreva

```typescript
export type CarInterface = IncoreModelInterface<Car>;
```

Após isso você pode usar essa interface para dar tipo aos seus dados

```typescript
const someData: CarInterface;
```

**RECAPITULANDO**

- Crie uma class model
  - definas as propriedades dela
  - definir static tableName
  - definir static idColumn
  - exportar o tipo como está acima

Se você quiser definir um json schema para validação, escreva dentro da model

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

Importante que "properties" chama **this.properties** para permitir o Incore adicionar as propriedades padrões **_created_at_, _updated_at_, _status_** e
**_metadata_id_**

## Relações para a instrução "embed"

Para essas relações o Incore usa o **objection.js**

[`Leia mais aqui sobre relações`](https://vincit.github.io/objection.js/api/model/static-properties.html#static-relationmappings)

**Exemplo dentro da model, precisar ser static**

Imagine que eu queira que quando eu fazer uma listagem de carros eu quero que venha o motorista e também os documentos do carro, imaginemos então que eu já criei uma outra model **Driver** e uma outra CarData

Imagine que eu quero que venha junto somente um motorista do carro, para isso eu uso o seguinte

**IncoreModel.HasOneRelation**

```typescript
// resultando em:
const driver = data.item.driver;
```

E se eu quiser que retorne mais motoristas? é assim:

**IncoreModel.HasManyRelation**

```typescript
// resultando em:
data.item.driver.forEach((d) => {
  console.log(d.name);
});
```

**Dentro da model escreva o seguinte:**

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

**Informação rápida:**

```text
O Incore sempre retorna "data.item" para resultados com instrução "first"
ou com com instrução **"id"** e retorna "data.items" no plural
para múltiplos resultados
```

Após isso você não precisará se preocupar mais em ter de escrever queries com JOINS, apenas vai fazer assim ao enviar a solicitação:

```JSON
{
    "embed": "driver"
}
```

ou para incluir docs, ou seja, mais de uma relação

```JSON
{
    "embed": "[driver,docs]"
}
```

ou se ainda quiser que retorne relações das outras models também, escreva assim:

```JSON
{
    "embed": "[driver.[outra, etc], docs]"
}
```

Note que "docs" usa **IncoreModel.HasManyRelation** que retornará um array:

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

É possível fazer muito mais coisas dentro dessa model, continue lendo

Agora que já sabemos como criar a model vamos criar uma rota

Você pode escrever suas rotas por exemplo em um arquivo chamado **rotas.ts** feito isso vamos inserir nele as nossas rotas, que será apenas um array, vamos criar uma rota para nossa model **Car** que foi criada acima

```typescript
import { IncoreRouteConfig } from "incore";

export const myRoutes: IncoreRouteConfig[] = [
  {
    path: "/cars",
    model: Car,
  },
];
```

Pronto, apenas isso por hora, lembrando que precisa seguir o tipo **IncoreRouteConfig**.

_Continue lendo para saber como usar middleware nas rotas_

Agora vamos voltar lá onde inicializamos tudo e logo acima de await **Incore.bootstrap()**, registre suas rotas, veja:

```typescript
// const app = express()
// [...]

// Registre suas rotas
Incore.createRoutes(myRoutes);

await Incore.bootstrap();
```

Após isso já podemos fazer chamadas nessa rota

```text
http://localhost:3000/v1/cars
http://localhost:3000/v1/cars/create
http://localhost:3000/v1/cars/update
http://localhost:3000/v1/cars/del
http://localhost:3000/v1/cars/patch
```

**Atenção:**

Não escreva /create, /update, /del ou /patch, escreva apenas "/cars" o Incore criará todas automaticamente

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

ou se não enviar o "id" na instrução

```http
PUT http://localhost:3000/v1/cars/update/ID_CRIPTOGRAFADO
```

```json
{
  "id": "ID_CRIPTOGRAFADO",
  "data": {
    "color": "blue",
    "model": "luxury"
  }
}
```

Internamente o Incore criou os seguintes endpoints para "cars"

```http
GET      http://localhost:3000/v1/cars/
POST     http://localhost:3000/v1/cars/
POST     http://localhost:3000/v1/cars/create
UPDATE   http://localhost:3000/v1/cars/update
DELETE   http://localhost:3000/v1/cars/del
PATCH    http://localhost:3000/v1/cars/patch
```

## Controlar a rota com middleware

Para cada action é possível definir diferentes middleware, mas antes vamos ver como são escritas os nomes das actions dentro do Incore

As actions vem do tipo **IncoreAction** e estas abaixo são as disponíveis no momento

```text
'CREATE' | 'READ' | 'UPDATE' | 'PATCH' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'SIGNUP' | 'REFRESH'
```

Agora imagine que você não quer que um usuário não autenticado cadastre e atualize carros (estamos na model Car)

```typescript
const handlers: IncoreApiRouteHandler[] = [
  {
    handler: authMiddleware,
  },
  {
    handler: myOtherMiddleware,
    args: ["arg1"],
  },
];

const middleware: IncoreApiRouteMiddleware[] = [
  {
    action: "CREATE",
    middleware: handlers,
  },
  {
    action: "UPDATE",
    middleware: handlers,
  },
  {
    action: "DELETE",
    middleware: handlers,
  },
];
```

Acima já temos nosso middleware que pode ser agora adicionado em quantas rotas quisermos

Como deve ter notado em **"myOtherMiddleware"**, é possível enviar argumentos que serão recebidos no middleware: **(arg1, arg2, arg3)**

### Adicionando o middleware nas rotas

```typescript
export const myRoutes: IncoreRouteConfig[] = [
  {
    path: "/cars",
    model: Car,
    middleware: middleware,
  },
  {
    path: "/other/path",
    model: OtherModel,
    middleware: middleware,
  },
];
```

A partir de agora ao tentar cadastrar um carro, atualizar, ou excluir só será possível se estiver autenticado devido ao middleware **authMiddleware**

_Continue lendo para saber como criar seus próprios middleware_

## Como usar roleMiddleware e claimMiddleware

```typescript
// ROLES
// Deve retornar o tipo RoleResponse
// criamos uma função separada para ficar organizado
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

// Enviamos rolesChecker e claimsChecker como um argumento para o middleware
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

Agora atribua **"middleware"** em quantas rotas quiser como visto acima

## Crie seu próprio middleware

Um middleware deve implementar o tipo **IncoreApiMiddleware** retornando um middleware padrão do express

```text
Deve retornar
(req, res, nex) => {}
```

Se precisar responder prematuramente e bloquear a execução normal por algum motivo envie **IncoreResponse.json** passando null como data, um status http, a mensagem e **res** ou se estiver tudo ok **next()** para continuar como mostrado abaixo

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

        // continue normalmente
        next()
    }
}
```

Use seu novo middleware igual como mostrado com os outros, authMiddleware, roleMiddleware e claimMiddleware passando argumentos se precisar

# Usando suas próprias queries

## Chamando métodos dentro de suas models por instrução via JSON

Imagine enviar um propriedade JSON com um array como valor e o Incore chamar um método dentro da sua model com esse nome e com os argumentos do array

Vamos criar dentro da nossa model um método chamado **doSomething** esperando 3 argumentos, um string, outro número e outro boolean

Aqui dentro você pode criar suas próprias queries, elas são knex normal, a diferença que não precisa passar nome de tabela pois a model já faz isso, utilize também todas a facilidades do objection

```typescript
class MyModel extends IncoreModel {
  prop: string;

  static tableName = "my_table";

  static idColumn = "id_col";

  async doSomething(
    arg1: string,
    arg2: number,
    arg3: boolean
  ): Promise<IncoreApiResponse<MyModelInterface> | null> {
    const { data, params, offset, page } = this.instructions();

    const expressRequest = this.repository().request;

    // Escreva suas próprias queries
    // Se precisar de uma query de outra tabela, use a model dela
    const queryResult = await MyModel.query()
      .where("..", "..")
      .withGraphFetched(this.instructions().embed ?? "");

    // Para e retorna sua própria resposta
    if (data.email == "abc@example.com") {
      return {
        code: IncoreResponseCode.FORBIDDEN,
        message: "...",
      };
    } else {
      // retorne seu próprio resultado
      // utilize item no singular caso seja resultado único
      // por exemplo quando utilizar .first()

      // Calcule o total de resultados
      const total = 50;

      const navigation = this.navigation(total, page);

      return {
        code: IncoreResponseCode.OK,
        items: queryResult,
        navigation: navigation,
      };
    }

    // Altere as instruções se precisar
    const newInstructions = {
      ...this.instructions(),
      first: true,
    };

    // Passe as novas instruções para o repositório
    this.repository().apiInstructions = newInstructions;

    // Continua normalmente
    return null;
  }
}

export type MyModelInterface = IncoreModelInterface<MyModel>;
```

### Outras propriedades que podem ser retornadas

```typescript
return {
  code: IncoreResponseCode.OK,
  redirectTo: "http://example.com",
  html: "<DOCTYPE html>...html code",
  js: "JavaScript code",
  text: "Text code",
};
```

Agora vamos chamar esse método diretamente pelo JSON

```http
POST http://localhost:3000/v1/my/endpoint/create
```

```json
{
  "doSomething": ["simples assim", 1, true],

  "data": {
    "name": "John",
    "email": "abc@example.com"
  }
}
```

# Uploads

Com o Incore é muito fácil lidar com uploads, para isso já existe uma tabela chamada **media** para imagens e vídeos

Para receber uploads são dois passos únicos

### Definir o path e baseUrl no arquivo incore.json

```json
{
  "uploads": {
    "path": "/var/www/html/site/",
    "baseUrl": "http://example.com"
  }
}
```

### Adicionar dois middleware um após o outro

```text
uploadService
mediaMiddleware
```

```typescript
import { authMiddleware, uploadService, mediaMiddleware } from "incore";

const uploadMiddlewareHandlers: IncoreApiRouteHandler[] = [
  {
    handler: authMiddleware, // <--- se precisar de autenticação
  },
  {
    handler: uploadService, // <--- primeiro este
  },
  {
    handler: mediaMiddleware, // <--- em seguida este
  },
];

const uploadMiddleware: IncoreApiRouteMiddleware[] = [
  {
    action: "CREATE",
    middleware: uploadMiddlewareHandlers,
  },
  {
    action: "UPDATE",
    middleware: uploadMiddlewareHandlers,
  },
];

// Atribua nas suas rotas que precisam de upload

export const myRoutes: IncoreRouteConfig[] = [
  {
    path: "/cars",
    model: Car,
    middleware: uploadMiddleware,
  },
  {
    path: "/cars/docs",
    model: Docs,
    middleware: uploadMiddleware,
  },
];
```

No geral você somente precisará de upload nas actions CREATE e UPDATE, ou seja, POST e UPDATE

Isso é tudo que você precisa! Para obter as imagens basta enviar na instrução "embed" assim

```json
{
  "embed": "media"
}
```

Irá retornar todos os uploads com os resultados

```typescript
data.item.media.foreach((m) => {
  console.log(m.url);
});
```

## Principais propriedades de media

| Propriedade | Tipo     | Descrição                           |
| :---------- | :------- | :---------------------------------- |
| `media_id`  | `string` | ID criptografada                    |
| `source`    | `string` | caminho para o arquivo no disco     |
| `url`       | `string` | URL completa para a imagem ou vídeo |

### Outras

```text
type (1=image, 2=video), width, height, x, y, duration,
color_filter, format, mimetype, resolution, aspect_ratio,
bit_rate, frame_rate, channels, sampling_rate, commercial_name,
compression_mode, bit_depth, size
```

# Filtros

Os filtros no Incore substitui completamente WHERE and OR, eles são do tipo **array[][][]**, dessa maneira conseguimos entender que são dois arrays dentro, um para WHERE e outro para OR

Imagine que queremos todos os usuários com status igual a 2 e que o email inicie com **"john"**, nosso JSON fica assim:

Cada filtro possui 3 valores, o nome, o operador e o valor, o operador pode ser omitido, com isso o Incore entender que você quer usar igual a (=)

```http
POST http://localhost:3000/v1/users
```

```json
{
  "filters": [
    [
      ["status", 2],
      ["email", "like", "john%"]
    ]
  ]
}
```

Você pode usar todos os padrões do LIKE nativo

Agora vamos acrescentar "**OR**"

```json
{
  "filters": [
    [
      ["status", 2],
      ["email", "like", "john%"]
    ],
    [
      ["status", 3],
      ["email", "like", "%jack%"]
    ]
  ]
}
```

Em uma query SQL esses filtros ficariam assim:

```sql
WHERE
  (`status` = 2 AND `email` LIKE 'john%')
OR
  (`status` = 3 AND `email` LIKE '%jack%')
```

Você pode usar todos os operadores: >, <, >=, <=, !=

```json
{
  "filters": [
    [
      ["status", ">=", 2],
      ["email", "like", "john%"]
    ]
  ]
}
```

# Metadata

No Incore cada tabela do banco de dados possui um campo chamado **metadata_id**, esse valor é criado automaticamente ao fazer **POST** **/create**, ou seja, na action **CREATE**

Esse id é relacionado com a tabela **metadata**, com isso é possível adicionar valores extras para cada entrada, exemplo:

Imagine que eu quero salvar o número da placa do carro do usuário mas esse campo não existe no tabela usuários, iremos usar a **metadata** para isso:

## Estrutura de metadata

| Propriedade     | Tipo     | Descrição                                       |
| :-------------- | :------- | :---------------------------------------------- |
| `metadata_id`   | `string` | ID criptografada                                |
| `related_to_id` | `string` | relação com o **metadata_id** em outras tabelas |
| `name`          | `string` | Nome, exemplo: placa_do_carro                   |
| `val`           | `any`    | Valor, exemplo: 1234                            |

Existem duas maneiras de salvar dados em **metadata**

1. **Junto com o cadastro de alguma coisa**

```http
POST http://localhost:3000/v1/products/create
```

```json
{
  "data": {
    "...": "..."
  },

  "metadata": [
    {
      "name": "val"
    },
    {
      "name": "val"
    }
  ]
}
```

2. Separadamente na rota própria do Incore. Ao fazer assim, será preciso ter o **metadata_id** do conteúdo relacionado

```http
GET http://localhost:3000/v1/metadata
POST http://localhost:3000/v1/metadata
POST http://localhost:3000/v1/metadata/create
PUT http://localhost:3000/v1/metadata/update
```

Agora enviamos em **"data"**

```http
POST http://localhost:3000/v1/metadata/create
```

```json
{
  "data": {
    "related_to_id": "PRODUCT_METADATA_ID",
    "name": "data_name",
    "val": "value"
  }
}
```

**update**

```http
PUT http://localhost:3000/v1/metadata/update
```

```json
{
  "id": "METADATA_ID",

  "data": {
    "related_to_id": "PRODUCT_METADATA_ID",
    "name": "data_name",
    "val": "value"
  }
}
```

# Licença

[`ISC`](https://github.com/wercks/incore/blob/master/LICENSE)
