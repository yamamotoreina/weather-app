from django.http import JsonResponse
from django.db.models import Q
from django.views.decorators.http import require_GET

from weatherapp.models import City
# ------------------------
# オートコンプリート用検索
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
# 部分一致で候補を返す（autocomplete用）
# ------------------------

def find_city_candidates(query:str, limit:int = 20):
    # 入力文字列から部分不一致でCity候補を取得（複数返す）
    if not query:
        return City.objects.none()

    query = query.strip()

    candidates = City.objects.filter(
        Q(name__icontains=query)
        | Q(prefecture__icontains=query)
        | Q(city__icontains=query)
        | Q(ward__icontains=query)
        | Q(town__icontains=query)
    ).distinct()[:limit]

    return candidates

# ------------------------
# React側のオートコンプリートAPI
# ------------------------

@require_GET
def autocomplete(request):
    query = request.GET.get("q", "")
    results = find_city_candidates(query)
    data = [{"id": c.id, "label": str(c)} for c in results]
    return JsonResponse(data, safe=False)