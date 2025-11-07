from django.urls import path
from . import views

# weatherapp/urls.py
urlpatterns = [
    path('current/', views.get_current_weather, name='get_current_weather'),
    path('forecast/', views.get_forecast, name='get_forecast'),
    path('forecast_3h/', views.forecast_3h, name='forecast_3h'),
]

