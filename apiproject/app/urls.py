from django.urls import path
from .views import DataList, DataDetail

urlpatterns = [
    path('data/', DataList.as_view()),
    path('data/<int:pk>/', DataDetail.as_view()),
]
