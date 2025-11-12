
from django.db import models

# 市町村モデル
class City(models.Model):
    name = models.CharField(max_length=100, unique=True)       # 現状: 市区町村フル名
    prefecture = models.CharField(max_length=50, blank=True)  # 新規: 都道府県
    city = models.CharField(max_length=50, blank=True)        # 新規: 市単体
    ward = models.CharField(max_length=50, blank=True)     # 区
    town = models.CharField(max_length=100, blank=True)    # 町丁目
    # 緯度経度
    latitude = models.FloatField()
    longitude = models.FloatField()
     # 親（都道府県 or 市）を紐づける
    parent = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='children'
    )
    class Meta:
        db_table = "city" 
        indexes = [
            models.Index(fields=['prefecture']),
            models.Index(fields=['city']),
            models.Index(fields=['name']),
        ]

    def __str__(self):
        # 例: 福岡県福岡市中央区　すべての階層を動的に結合
        parts = [p for p in [self.prefecture, self.city, self.ward, self.town] if p]
        return ''.join(parts) or self.name

# 都市名を1件のみ保存する
class LastCity(models.Model):
    name = models.CharField(max_length=100)