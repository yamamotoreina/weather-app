import requests
from datetime import datetime
from decouple import config
'OPENWEATHER_API_KEY': config('OPENWEATHER_API_KEY', '')

def fetch_openweathermap_current(lat: float, lon: float):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    res = requests.get(url)
    data = res.json()

    rain_volume = data.get("rain", {}).get("1h") or data.get("rain", {}).get("3h") or 0
    rain_chance = calc_rain_chance(rain_volume)

    return {
        "date": datetime.utcfromtimestamp(data["dt"]).strftime("%m/%d"),
        "temp": round(data["main"]["temp"]),
        "tempMax": round(data["main"]["temp_max"]),
        "tempMin": round(data["main"]["temp_min"]),
        "rain": rain_chance,
        "description": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"],
        "humidity": data["main"]["humidity"],
        "windSpeed": data["wind"]["speed"],
        "lat": lat,
        "lon": lon,
        "updatedAt": datetime.utcnow().isoformat(),
    }

def fetch_openweathermap_forecast(lat: float, lon: float):
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    res = requests.get(url)
    data = res.json()

    # 日単位にまとめる
    grouped = {}
    for item in data["list"]:
        date_str = item["dt_txt"].split(" ")[0]
        if date_str not in grouped:
            grouped[date_str] = {
                "date": date_str,
                "tempMax": item["main"]["temp_max"],
                "tempMin": item["main"]["temp_min"],
                "description": item["weather"][0]["description"],
                "icon": item["weather"][0]["icon"],
                "rain": round(item["pop"] * 100),
            }
        else:
            grouped[date_str]["tempMax"] = max(grouped[date_str]["tempMax"], item["main"]["temp_max"])
            grouped[date_str]["tempMin"] = min(grouped[date_str]["tempMin"], item["main"]["temp_min"])
    return list(grouped.values())[:5]

def calc_rain_chance(rain_volume: float) -> int:
    if rain_volume == 0:
        return 0
    elif rain_volume < 0.1:
        return 10
    elif rain_volume < 0.3:
        return 20
    elif rain_volume < 0.5:
        return 30
    elif rain_volume < 0.8:
        return 40
    elif rain_volume < 1.2:
        return 50
    elif rain_volume < 2.0:
        return 60
    elif rain_volume < 3.0:
        return 70
    elif rain_volume < 5.0:
        return 80
    elif rain_volume < 7.0:
        return 90
    else:
        return 100
