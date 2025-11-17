# ベースイメージ
FROM node:20-slim

# 作業ディレクトリ
WORKDIR /app

# 依存関係を先にコピーしてインストール
COPY package.json package-lock.json ./

# npm install をキャッシュ
RUN npm ci

# 残りのソースをコピー
COPY . .

# ポート公開
EXPOSE 3000

# React開発サーバー起動
CMD ["sh", "-c", "CI=1 npx expo start --web --host lan"]

