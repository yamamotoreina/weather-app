# --- ベースイメージ ---
FROM python:3.10

# 作業ディレクトリ
WORKDIR /app

# 依存ライブラリ（mysqlclient ビルド用のパッケージを追加）
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# パッケージインストール
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# ソースコピー
COPY . .

# DB待機スクリプト
COPY wait_for_db.py ./wait_for_db.py

# MySQL 待機 → Django 起動
CMD ["sh", "-c", "python wait_for_db.py && python manage.py runserver 0.0.0.0:8000"]
