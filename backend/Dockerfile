# ベースイメージ
FROM python:3.10-slim

# 作業ディレクトリ
WORKDIR /app


# 依存関係を先にコピーしてインストール
COPY requirements.txt .
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt
# プロジェクト全体をコピー
COPY . .

# ポート公開
EXPOSE 8000

# Django開発サーバー起動
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
