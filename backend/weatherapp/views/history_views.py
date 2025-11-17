from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from weatherapp.models import LastCity

@csrf_exempt
def save_last_city(request):
    if request.method == "POST":
        data = json.loads(request.body)  # JSONを読み込む
        city_name = data.get("city")

        if not city_name:
            return JsonResponse({"error": "city missing"}, status=400)

        # 常に1件だけ保持
        LastCity.objects.all().delete()
        LastCity.objects.create(name=city_name)
        return JsonResponse({"status": "ok"})

# 取得用
def get_last_city(request):
    city = LastCity.objects.first()
    if city:
        return JsonResponse({"city": city.name})
    return JsonResponse({"city": None})
