# MojiEmoji API

MojiEmoji API は、選択した文字列から連想される絵文字を提案する Chrome 拡張機能 [**MojiEmoji**](https://github.com/otTATto/moji-emoji) のために作られた API です。

## 技術スタック

- Node.js: v18.19.1
- NestJS: v11.0.14

# 🚀 On-boarding

## 開発環境の構築と開発手順

1. 以下をを実行し、依存パッケージをインストールします
   ```
   npm install
   ```

2. 以下を実行し、開発サーバーを起動します
   ```
   npm start
   ```

3. 別なターミナルで以下を実行します
   ```
   curl -X POST http://127.0.0.1:3000/emoji-suggest \
     -H  "Content-Type: application/json" \
     -d '{"test":"お腹すいた"}'
   ```

4. 期待どおりのレスポンスが返るか確認します（以下はレスポンスの例です）
   ```
   {"emojis":[{"body":"🍔","name":"ハンバーガー","description":"お腹がすいたときに食べたい食べ物の代表格"},{"body":"🍣","name":"寿司","description":"美味しい料理で満たされたい時におすすめ"},{"body":"🍕","name":"ピザ","description":"シェアしやすく満足感のある食事"}]}
   ```
