# TypeORM学習内容

- TypeORMの初学内容をまとめたもの

## 目次

- [TypeORM学習内容](#typeorm学習内容)
  - [目次](#目次)
  - [参考](#参考)
  - [概要](#概要)
  - [手順](#手順)
    - [mySQLのコンテナ起動](#mysqlのコンテナ起動)
    - [Nestjsのインストールとプロジェクトの作成](#nestjsのインストールとプロジェクトの作成)

## 参考

- SQLServerの立ち上げ: https://qiita.com/jpnm0415shkm/items/5cc26c6add41b41bd25e
- CLIからGETとPOSTをする: https://qiita.com/takuyanin/items/949201e3eb100d4384e1
- TypeScriptの公式docs: https://www.npmjs.com/package/typeorm/v/0.3.20
- TypeORM version0.3のCRUDアプリ作成の説明サイト: https://zenn.dev/hasegawasatoshi/articles/8110ce79119dd0
- マイグレーション: https://qiita.com/Aurum64/items/f5962bd2a643447dbef9

## 概要

- Next.js+TypeORMでMySQLのDBに対してCRUD操作を行うアプリを作成する

## 手順

- 詳細と説明等は参考記載どおりのため割愛する
- 実際学習で行った手順と変更した部分のみ記載
- おおまかな手順
  - 環境構築
    - SQLサーバー
    - NextJSのインストール・プロジェクト作成
  - コード実装
  - SQLにCRUD操作ができていることの確認

### mySQLのコンテナ起動

- Windows側からdocker/docker-compose.ymlを`docker-compose up`から実行し、mySQLのサーバーを起動しておく

### Nestjsのインストールとプロジェクトの作成

```bash
$ npm i -g @nestjs/cli
$ nest new tutorial-app
$ cd tutorial-app
$ npm install --save @nestjs/typeorm typeorm mysql
```

