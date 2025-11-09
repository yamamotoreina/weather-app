##backend/settings.py
##Django の設定ファイル（ React連携対応 + PlanetScale接続 ）
import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url
from decouple import config

#.envの読み込み
load_dotenv()

# === 基本設定 ===
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv('SECRET_KEY', 'unsafe-default-key')
DEBUG = os.getenv('DEBUG', 'True') == True

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

# === データベース(PlanetScale対応) ===

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parent(DATABASE_URL,conn_max_age=600),
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': config('DB_NAME', 'weather_app'),
            'USER': config('DB_USER', 'weather_user'),
            'PASSWORD': config('DB_PASSWORD', ''),
            'HOST': config('DB_HOST', 'localhost'),
            'PORT': config('DB_PORT', '3306'),
            'OPTIONS': {'charset': 'utf8mb4',},
        }
    }

# === パスワード検証 ===
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# === 言語・タイムゾーン設定 ===
LANGUAGE_CODE = 'ja'
TIME_ZONE = 'Asia/Tokyo'
USE_I18N = True
USE_TZ = True

# === 静的ファイル ===
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# === CORS設定 ===
CORS_ALLOW_ALL_ORIGINS = True  # 開発時は全許可、本番では制限を推奨
CORS_ALLOW_CREDENTIALS = [
    "https://weather-app-0wud.onrender.com" , # RenderのフロントURL
]

#開発中のみ全許可
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

# === OpenWeatherMap APIキー ===
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
if not OPENWEATHER_API_KEY:
    print("⚠️ Warning: OPENWEATHER_API_KEY が .env に設定されていません。")

