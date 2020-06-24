from django.urls import path

from . import views

urlpatterns = [
    #path('', views.landing, name='landing'),
    path('test_landing/', views.landing, name='landing'),
]
