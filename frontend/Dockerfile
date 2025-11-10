# ベースイメージ
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# 依存関係を先にコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# ソースをコピー
COPY . .

# ポート公開
EXPOSE 3000

# React開発サーバー起動
CMD ["npm", "start"]
