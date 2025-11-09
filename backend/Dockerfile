# ベースイメージ
FROM python:3.11

# 作業ディレクトリ
WORKDIR /app

# システム依存パッケージのインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
# プロジェクト全体をコピー
COPY . .

# ポート公開
EXPOSE 8000

# Django開発サーバー起動
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
