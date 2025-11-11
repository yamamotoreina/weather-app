##backend/settings.py
##Django の設定ファイル（ React連携対応 ）
import os
from pathlib import Path
from dotenv import load_dotenv
from decouple import config

#.envの読み込み
load_dotenv()

# === 基本設定 ===
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv('SECRET_KEY', 'unsafe-default-key')
DEBUG = os.getenv('DEBUG', 'True').lower() in ['true', '1', 'yes']

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


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME', 'weather_app'),
        'USER': os.environ.get('DB_USER', 'weather_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'mysql-db'),
        'PORT': '3306',
        'OPTIONS': {'charset': 'utf8mb4','init_command': "SET sql_mode='STRICT_TRANS_TABLES'"},
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
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8081",  # Expo Web
    "http://127.0.0.1:8081",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False
# === OpenWeatherMap APIキー ===
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
if not OPENWEATHER_API_KEY:
    print("⚠️ Warning: OPENWEATHER_API_KEY が .env に設定されていません。")

