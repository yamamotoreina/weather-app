import os
import sys

def main():
    """Djangoの管理コマンドを実行するエントリーポイント"""
    # settings.py が同じ階層なので 'settings' のままでOK
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Djangoがインポートできません。仮想環境や依存パッケージを確認してください。"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
