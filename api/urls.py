from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api_overview"),
	path('restaurant_list/', views.restaurantList, name="api_restaurant_list"),
	path('restaurant_detail/<str:pk>/', views.restaurantDetail, name="api_restaurant_detail"),
	path('district_list/', views.districtList, name="api_district_list"),
]
