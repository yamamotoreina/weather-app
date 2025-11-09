# weatherapp/models.py
from django.db import models

# 天気の履歴モデル
class WeatherHistory(models.Model):
    city = models.CharField(max_length=100)
    prefecture = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField()
    temp = models.FloatField()
    temp_max = models.FloatField()
    temp_min = models.FloatField()
    rain = models.IntegerField()
    description = models.CharField(max_length=200)
    icon = models.CharField(max_length=50)
    humidity = models.IntegerField()
    wind_speed = models.FloatField()
    lat = models.FloatField()
    lon = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.city} ({self.date})"


# 市町村モデル
class City(models.Model):
    name = models.CharField(max_length=100, unique=True)       # 現状: 市区町村フル名
    prefecture = models.CharField(max_length=50, blank=True)  # 新規: 都道府県
    city = models.CharField(max_length=50, blank=True)        # 新規: 市単体
    ward = models.CharField(max_length=50, blank=True)     # 区
    town = models.CharField(max_length=100, blank=True)    # 町丁目
    latitude = models.FloatField()
    longitude = models.FloatField()
     # 追加：親（都道府県 or 市）を紐づける
    parent = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='children'
    )
    class Meta:
        db_table = "city" 

    def __str__(self):
        # 例: 福岡県福岡市中央区
        parts = [self.prefecture, self.city, self.name]
        return "".join([p for p in parts if p])

#都市名を1件のみ保存する
class LastCity(models.Model):
    name = models.CharField(max_length=100)