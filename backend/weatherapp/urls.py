from django.urls import path
from weatherapp.views import (weather_views, search_views, history_views)

# weatherapp/urls.py
urlpatterns = [
    path('current/', weather_views.get_current_weather, name='get_current_weather'),
    path('forecast/', weather_views.get_forecast, name='get_forecast'),
    path('forecast_3h/', weather_views.forecast_3h, name='forecast_3h'),

    path("autocomplete/", search_views.autocomplete, name="autocomplete"),

    path('save_last_city/', history_views.save_last_city, name='save_last_city'),
    path('last_city/', history_views.get_last_city, name='get_last_city'),
]

