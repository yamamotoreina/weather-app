# backend/wait_for_db.py
import time
import socket
import os

def wait_for_db(host, port):
    print(f"⏳ Waiting for database {host}:{port} ...")
    while True:
        try:
            with socket.create_connection((host, int(port)), timeout=3):
                print(f"✅ Database {host}:{port} is available!")
                return
        except (OSError, ConnectionRefusedError):
            print("❌ Database not ready, retrying in 3s...")
            time.sleep(3)

if __name__ == "__main__":
    host = os.environ.get("DB_HOST", "mysql-db")
    port = os.environ.get("DB_PORT", "3306")
    wait_for_db(host, port)
