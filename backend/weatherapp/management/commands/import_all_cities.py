import csv
import os
from django.core.management.base import BaseCommand
from weatherapp.models import City

class Command(BaseCommand):
    help = "都道府県→市区町村→町丁目データを省メモリでインポート"

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            type=str,
            default="weatherapp/data",
            help="CSVファイルが格納されているディレクトリパス"
        )
        parser.add_argument(
            "--batch",
            type=int,
            default=500,
            help="一度にDBへ登録する件数（メモリ制御用）"
        )

    def handle(self, *args, **options):
        base_dir = options["path"]
        batch_size = options["batch"]

        if not os.path.exists(base_dir):
            self.stderr.write(self.style.ERROR(f"❌ ディレクトリが見つかりません: {base_dir}"))
            return

        files = sorted([f for f in os.listdir(base_dir) if f.endswith(".csv")])

        if not files:
            self.stderr.write(self.style.ERROR("❌ CSVファイルが見つかりません。"))
            return

        total_inserted = 0

        for file_name in files:
            path = os.path.join(base_dir, file_name)
            self.stdout.write(self.style.WARNING(f"📂 {file_name} の読み込み開始..."))

            with open(path, 'r', encoding='cp932', errors='ignore') as f:
                reader = csv.DictReader(f)
                buffer = []
                line_count = 0

                for row in reader:
                    line_count += 1

                    # ✅ CSV列名に合わせて取得（柔軟対応）
                    pref = row.get("都道府県名") or row.get("都道府県") or ""
                    city = row.get("市区町村名") or ""
                    ward = row.get("区名") or ""
                    town = row.get("大字_丁目名") or ""

                    lat = row.get("緯度") or ""
                    lon = row.get("経度") or ""
                    if not lat or not lon:
                        continue

                    name_parts = [pref, city, ward, town]
                    full_name = "".join([p for p in name_parts if p])

                    city_obj = City(
                        name=full_name,
                        prefecture=pref,
                        city=city,
                        ward=ward,
                        town=town,
                        latitude=float(lat),
                        longitude=float(lon)
                    )
                    buffer.append(city_obj)

                    # ✅ バッチ登録（省メモリ）
                    if len(buffer) >= batch_size:
                        City.objects.bulk_create(buffer, ignore_conflicts=True)
                        total_inserted += len(buffer)
                        buffer.clear()

                # ✅ 残りを登録
                if buffer:
                    City.objects.bulk_create(buffer, ignore_conflicts=True)
                    total_inserted += len(buffer)

                self.stdout.write(self.style.SUCCESS(
                    f"✅ {file_name}: {line_count}件処理完了"
                ))

        self.stdout.write(self.style.SUCCESS(
            f"\n🎉 全ファイル処理完了（合計 {total_inserted:,} 件登録）"
        ))