import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')  # settings.py を指定

application = get_wsgi_application()  # WSGI アプリケーションを生成
