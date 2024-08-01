# TypeORM学習内容

- TypeORMの初学内容をまとめたもの

## 目次

- [TypeORM学習内容](#typeorm学習内容)
  - [目次](#目次)
  - [参考](#参考)
  - [概要](#概要)
  - [手順](#手順)
    - [mySQLのコンテナ起動とネットワークの共有](#mysqlのコンテナ起動とネットワークの共有)
    - [Nestjsのインストールとプロジェクトの作成](#nestjsのインストールとプロジェクトの作成)
    - [マイグレーションの設定](#マイグレーションの設定)
    - [crud操作の実装](#crud操作の実装)
      - [動作確認](#動作確認)

## 参考

- TypeScriptの公式docs: https://www.npmjs.com/package/typeorm/v/0.3.20
- mySQLのサーバーの立ち上げ: https://qiita.com/jpnm0415shkm/items/5cc26c6add41b41bd25e
- CLIからGETとPOSTをする: https://qiita.com/takuyanin/items/949201e3eb100d4384e1
- TypeORM version0.3のCRUDアプリ作成の説明サイト: https://zenn.dev/hasegawasatoshi/articles/8110ce79119dd0
- マイグレーション: https://qiita.com/Aurum64/items/f5962bd2a643447dbef9

## 概要

- Next.js+TypeORMでMySQLのDBに対してCRUD操作を行うアプリを作成する
- curlコマンドなどからAPIにデータを送信して対応したCRUD操作を行う

## 手順

- 詳細と説明等は参考記載どおりのため割愛する
- 実際学習で行った手順と変更した部分のみ記載
- おおまかな手順
  - 環境構築
    - SQLサーバー
    - NextJSのインストール・プロジェクト作成
  - コード実装
  - SQLにCRUD操作ができていることの確認

### mySQLのコンテナ起動とネットワークの共有

- Windows側からdocker/docker-compose.ymlを`docker-compose up`から実行し、mySQLのサーバーを起動しておく
- TypeORMとMySQLを起動しているコンテナを同一ネットワークにして接続出来るようにする(下記コマンド)

```bash
# コンテナネットワークの作成
$ docker network create my_network

# 各コンテナをネットワークに入れる
# "mysql_container_name"などは作成したコンテナの名前
$ docker network connect my_network mysql_container_name
$ docker network connect my_network typescript_dev_container_name  

# ネットワークの確認
$ docker network inspect my-network
[
    {
        "Name": "my-network",
        "Id": "xxxx",
        "Created": "2024-07-31T01:25:05.595640912Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.21.0.0/16",
                    "Gateway": "172.21.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "xxxx": {
                "Name": "mysql_container_name",
                "EndpointID": "xxxx",
                "MacAddress": "02:42:ac:15:00:03",
                "IPv4Address": "172.21.0.3/16",  # ★このアドレスに対して同一ネットワーク内のコンテナから接続が可能
                "IPv6Address": ""
            },
            "xxxx": {
                "Name": "typescript_dev_container_name",
                "EndpointID": "xxxx",
                "MacAddress": "02:42:ac:15:00:02",
                "IPv4Address": "172.21.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

### Nestjsのインストールとプロジェクトの作成

```bash
# 必要なパッケージのインストール
$ npm i -g @nestjs/cli
$ nest new tutorial-app
$ cd tutorial-app
$ npm install --save @nestjs/typeorm typeorm mysql

# プロジェクトの作成
$ nest new type-orm_app
```

### マイグレーションの設定

- エンティティファイル(DB情報)を作成

js/TypeORM/type-orm_app/src/books/entities/book.entity.ts

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
    comment: 'ID',
  })
  readonly id: number;

  @Column('varchar', { comment: '著者名' })
  auther: string;

  @Column('varchar', { comment: '備考' })
  memo: string;
}
```

エンティティファイルからマイグレーションファイルを作成

```bash
$ cd js/TypeORM/type-orm_app
$ npx typeorm-ts-node-commonjs migration:generate src/migration/BookMigration -d src/books/entities/book.entity.ts
```

データベース接続設定の変更
js/TypeORM/type-orm_app/src/data-source.ts

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from './books/entities/book.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '172.21.0.3',  // dockerで設定したネットワーク内のmySQLコンテナのhost名
  port: 3306,
  username: 'develop',
  password: 'password',
  database: 'develop',
  synchronize: true,
  logging: false,
  entities: [Book],
  migrations: ['src/migration/*.ts'],
});

```


マイグレーションの実行

```bash
$ npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

また、マイグレーションの設定を主導で行わなくてもdatabaseモジュールを記載した状態でnpm startすればマイグレーションは行われる

js/TypeORM/type-orm_app/src/database.module.ts

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Book } from './books/entities/book.entity';
import { Cat } from './cats/entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        // ★データベースとの接続設定を記載
        type: 'mysql',
        host: '172.21.0.3',
        port: 3306,
        username: 'develop',
        password: 'password',
        database: 'develop',
        entities: [Book, Cat],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
```

app.module.tsで呼び出す

js/TypeORM/type-orm_app/src/app.module.ts

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

### crud操作の実装

- Controller,Serviceを実装し、CRUD操作を出来るようにする
- js/TypeORM/type-orm_app/src/books/books.controller.ts
  - GETやPOST時に呼び出す動作を記載
- js/TypeORM/type-orm_app/src/books/books.service.ts
  - 上記Controllerから呼び出される実際のDB操作の内容を記載

#### 動作確認

登録

```
$ curl --location --request POST 'localhost:3000/cats' \
    --header 'Content-Type: application/json' \
    --data-raw '{"name": "tama"}'
```

全件取得

```bash
curl --location --request GET 'localhost:3000/cats' \
    --header 'Content-Type: application/json'
```

一件取得

```bash
curl --location --request GET 'localhost:3000/cats/1' \
    --header 'Content-Type: application/json'
```

更新

```bash
curl --location --request PATCH 'localhost:3000/cats/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{"name": "pochi"}'
```

削除

```bash
curl --location --request DELETE 'localhost:3000/cats/1' \
    --header 'Content-Type: application/json'
```