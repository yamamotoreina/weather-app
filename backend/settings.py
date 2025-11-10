##backend/settings.py
##Django の設定ファイル（ React連携対応 + PlanetScale接続 ）
import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

#.envの読み込み
load_dotenv()

# === 基本設定 ===
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'unsafe-default-key')
DEBUG = os.getenv('DEBUG', 'True').lower() in ["true", "1", "yes"]

# Renderでも動くようにワイルドカード許可
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')

# === アプリ登録 ===
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders", # React連携用
    'weatherapp',  # Django アプリを登録
]

# === ミドルウェア ===
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ← 一番上に追加推奨
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'urls'

# === テンプレート設定 ===
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wsgi.application'

# === データベース ===
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Render / 本番用：DATABASE_URLから自動設定
    DATABASES = {
        "default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)
    }
else:
    # Docker / ローカル開発用
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("DATABASE_NAME", "weather_app"),
            "USER": os.getenv("DATABASE_USER", "user"),
            "PASSWORD": os.getenv("DATABASE_PASSWORD", "password"),
            "HOST": os.getenv("DATABASE_HOST", "postgres-db"),
            "PORT": os.getenv("DATABASE_PORT", "5432"),
        }
    }

# === パスワード検証 ===
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# === 言語と時刻 ===
LANGUAGE_CODE = "ja"
TIME_ZONE = "Asia/Tokyo"
USE_I18N = True
USE_TZ = True

# === 静的ファイル ===
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# === CORS設定 ===
CORS_ALLOW_ALL_ORIGINS = DEBUG  # 開発時のみ全許可
CORS_ALLOWED_ORIGINS = []
frontend_url = os.environ.get("FRONTEND_URL")
if frontend_url:
    CORS_ALLOWED_ORIGINS.append(frontend_url)


CORS_ALLOW_CREDENTIALS = True

# === OpenWeather APIキー ===
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not OPENWEATHER_API_KEY:
    print("⚠️ Warning: OPENWEATHER_API_KEY が .env に設定されていません。")
