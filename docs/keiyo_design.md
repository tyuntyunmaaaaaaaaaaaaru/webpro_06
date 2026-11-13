# 京葉線システム（station2）設計

## 対象

京葉線の駅の情報（駅コード・駅名・乗り換え線・乗客数・距離）を一覧・詳細表示し，
追加・変更・削除ができる Web アプリ．データは `app5.js` 内の配列 `station2` に保持する．

## 機能一覧

| 機能 | 内容 |
|---|---|
| 一覧表示 | 駅の一覧を表で表示．駅名で検索，並び順（ID順・東京駅から近い順・乗客数が多い順）の切り替えができる |
| 詳細表示 | 駅名をクリックすると，その駅の全項目を表示する |
| 追加 | フォームに入力して駅を追加する（駅コードと駅名は必須） |
| 変更 | 詳細ページから変更フォームを開き，現在の値を書き換える |
| 削除 | 詳細ページから確認ダイアログ付きで削除する |

## ページ遷移

- 一覧 `/keiyo2` → 駅名をクリック → 詳細 `/keiyo2/:number`
- 一覧 `/keiyo2` → 「駅を追加する」 → 追加フォーム `/keiyo2_new` → 送信（`/keiyo2_add`） → 一覧
- 詳細 `/keiyo2/:number` → 「この駅を変更する」 → 変更フォーム `/keiyo2_edit/:number` → 送信（`/keiyo2_update/:number`） → 詳細
- 詳細 `/keiyo2/:number` → 「この駅を削除する」 → `/keiyo2_delete/:number` → 一覧
- 各ページから「駅一覧に戻る」で一覧へ戻れる

## URL 一覧

| URL | 受け取り方 | 役割 |
|---|---|---|
| `/keiyo2` | query（q, sort） | 一覧表示・検索・並び替え |
| `/keiyo2/:number` | params（number） | 詳細表示 |
| `/keiyo2_new` | なし | 追加フォーム |
| `/keiyo2_add` | query（code, name, change, passengers, distance） | 追加処理 |
| `/keiyo2_edit/:number` | params | 変更フォーム |
| `/keiyo2_update/:number` | params + query | 変更処理 |
| `/keiyo2_delete/:number` | params | 削除処理 |

`:number` は配列 `station2` の添字（0 始まり）．

## スキーマ（station2 の 1 件分）

| 項目 | 型 | 説明 | 必須 |
|---|---|---|---|
| id | 数値 | 通し番号．追加時に（最大の id + 1）を自動で付ける | 自動 |
| code | 文字列 | 駅コード（例：JE01） | ○ |
| name | 文字列 | 駅名 | ○ |
| change | 文字列 | 乗り換え線（なければ空文字） | |
| passengers | 数値 | 1 日の乗客数 | |
| distance | 数値 | 東京駅からの距離（km） | |

## エラー時の動作

- 存在しない `:number` を指定した場合は 404 を返す
- 追加・変更で駅コードか駅名が空の場合は 400 を返す
