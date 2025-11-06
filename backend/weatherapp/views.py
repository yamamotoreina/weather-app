# weatherapp/views.py
from django.http import JsonResponse
from weatherapp.models import City
from django.db.models import Q
import requests
from django.conf import settings
from collections import defaultdict

BASE_URL = "https://api.openweathermap.org/data/2.5"

# ------------------------
# 汎用検索ヘルパー
# ------------------------
def find_city_by_query(query: str):
    """ユーザーの検索文字列から最も近いCityを推定する"""
    if not query:
        return None

    # 前後の空白を削除
    query = query.strip()

    # 県、市、区、町丁目 どのカラムに含まれてもOK（部分一致）
    candidates = City.objects.filter(
        Q(name__icontains=query)
        | Q(prefecture__icontains=query)
        | Q(city__icontains=query)
        | Q(ward__icontains=query)
        | Q(town__icontains=query)
    )

    # 完全一致優先 → 次に部分一致で1件を返す
    exact = candidates.filter(
        Q(name=query)
        | Q(city=query)
        | Q(ward=query)
        | Q(town=query)
    ).first()

    if exact:
        return exact
    return candidates.first()


# ------------------------
# 現在の天気
# ------------------------
def get_current_weather(request):
    query = request.GET.get("q")
    city_obj = find_city_by_query(query)

    if not city_obj:
        return JsonResponse({"error": f"'{query}' に該当する地点が見つかりません"}, status=404)

    params = {
        "lat": city_obj.latitude,
        "lon": city_obj.longitude,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric",
        "lang": "ja",
    }

    try:
        response = requests.get(BASE_URL + "/weather", params=params)
        response.raise_for_status()
        data = response.json()

        current = {
            "name": city_obj.name,
            "prefecture": city_obj.prefecture,
            "city": city_obj.city,
            "ward": city_obj.ward,
            "town": city_obj.town,
            "temp": round(data["main"]["temp"]),
            "tempMax": round(data["main"]["temp_max"]),
            "tempMin": round(data["main"]["temp_min"]),
            "humidity": data["main"]["humidity"],
            "description": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
            "windSpeed": data["wind"]["speed"],
        }
        return JsonResponse(current)
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)


# ------------------------
# 5日間予報（日単位）
# ------------------------
def get_forecast(request):
    query = request.GET.get("q")
    city_obj = find_city_by_query(query)

    if not city_obj:
        return JsonResponse({"error": f"'{query}' に該当する地点が見つかりません"}, status=404)

    params = {
        "lat": city_obj.latitude,
        "lon": city_obj.longitude,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric",
        "lang": "ja",
    }

    try:
        response = requests.get(BASE_URL + "/forecast", params=params)
        response.raise_for_status()
        data = response.json()

        grouped = defaultdict(list)
        for item in data["list"]:
            date_str = item["dt_txt"].split(" ")[0]
            grouped[date_str].append(item)

        forecast_list = []
        for date, entries in grouped.items():
            temps = [e["main"]["temp"] for e in entries]
            descriptions = [e["weather"][0]["description"] for e in entries]
            icons = [e["weather"][0]["icon"] for e in entries]
            rain = [int(e.get("pop", 0) * 100) for e in entries]

            forecast_list.append({
                "date": date,
                "tempMin": round(min(temps), 1),
                "tempMax": round(max(temps), 1),
                "description": max(set(descriptions), key=descriptions.count),
                "icon": max(set(icons), key=icons.count),
                "rain": max(rain),
            })

        return JsonResponse(forecast_list[:5], safe=False)
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
