from django.urls import path
from . import views

urlpatterns = [
    path("current/", views.get_current_weather, name="current_weather"),  # ?prefecture=...&city=...
    path("forecast/", views.get_forecast, name="get_forecast"),           # ?prefecture=...&city=...
]
