# React + TypeScript + Vite

React+TypeScript+Viteで作成したアプリの学習内容を記載する

## 目次

- [React + TypeScript + Vite](#react--typescript--vite)
  - [目次](#目次)
  - [参考](#参考)
  - [viteの概要](#viteの概要)
  - [インストール手順](#インストール手順)

## 参考

- 公式ドキュメント: https://ja.vitejs.dev/guide/why.html

## viteの概要

- viteはJavaScriptにおいて開発環境を整えるために使用できるツール
- 特徴
  - テンプレートが用意されているため開発開始が容易
  - 開発サーバー、ブラウザとの連携(コードを変更したときの更新)が高速
  - 

## インストール手順

`vite_practice`という名前のviteプロジェクトの作成

```bash
$ npm create vite@latest
> npx
> create-vite

✔ Project name: … vite_practice
✔ Select a framework: › React
✔ Select a variant: › TypeScript + SWC

Scaffolding project in /workspaces/typescript-node/PracticeReactApp/js/vite_practice...

Done. Now run:

  cd vite_practice
  npm install
  npm run dev
```

インストールから立ち上げまで

```bash
$ cd vite_practice
$ npm install
$ npm run dev
```