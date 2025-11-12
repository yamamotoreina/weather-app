##dataをJSON化・Django REST Framework 用シリアライザ
from rest_framework import serializers
from .models import City

class CitySerializer(serializers.ModelSerializer):
    # 表示用: 「山口県下関市」のような結合文字列
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ['id', 'prefecture', 'city', 'ward', 'town', 'latitude', 'longitude', 'display_name']

    def get_display_name(self, obj):
        # 都道府県 + 市 + 区 + 町 の連結
        parts = [p for p in [obj.prefecture, obj.city, obj.ward, obj.town] if p]
        return ''.join(parts)
