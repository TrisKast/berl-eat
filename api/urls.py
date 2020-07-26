from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api_overview"),
	path('restaurant_list/', views.restaurantList, name="api_restaurant_list"),
	path('restaurant_detail/<str:pk>/', views.restaurantDetail, name="api_restaurant_detail"),
	path('district_list/', views.districtList, name="api_district_list"),
	path('kiez_list/', views.kiezList, name="api_kiez_list"),
	path('cuisine_list/', views.cuisineList, name="api_cuisine_list"),
	path('cuisinetoptier_list/', views.cuisineTopTierList, name="api_cuisineTopTier_list"),
	path('mealtime_list/', views.mealTimeList, name="api_mealTime_list"),
	path('special_list/', views.specialList, name="api_special_list"),
]
