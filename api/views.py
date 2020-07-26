from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RestaurantSerializer, DistrictSerializer, KiezSerializer, MealtimeSerializer, SpecialSerializer, CuisineSerializer, CuisineTopTierSerializer
from general.models import Restaurant, District, Kiez, Mealtime, Special, Cuisine, CuisineTopTier

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Restaurant List':'/restaurant_list/',
		'Restaurant Detail View':'/restaurant_detail/<str:pk>/',
		'District List':'/district_list/',
		'Kiez List':'/kiez_list/',
		'Cuisine List':'/cuisine_list/',
		'Cuisine Top Tier List':'/cuisinetoptier_list/',
		'Special List':'/special_list/',
		'Mealtime List':'/mealtime_list/',
		}

	return Response(api_urls)

@api_view(['GET'])
def restaurantList(request):
	restaurants = Restaurant.objects.all().order_by('-id')
	serializer = RestaurantSerializer(restaurants, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def restaurantDetail(request, pk):
	restaurants = Restaurant.objects.get(id=pk)
	serializer = RestaurantSerializer(restaurants, many=False)
	return Response(serializer.data)

@api_view(['GET'])
def districtList(request):
	districts = District.objects.all()
	serializer = DistrictSerializer(districts, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def kiezList(request):
	kieze = Kiez.objects.all()
	serializer = KiezSerializer(kieze, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def mealTimeList(request):
	mealtimes = Mealtime.objects.all()
	serializer = MealtimeSerializer(mealtimes, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def specialList(request):
	specials = Special.objects.all()
	serializer = SpecialSerializer(specials, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def cuisineList(request):
	cuisines = Cuisine.objects.all()
	serializer = CuisineSerializer(cuisines, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def cuisineTopTierList(request):
	cuisineTopTiers = CuisineTopTier.objects.all()
	serializer = CuisineTopTierSerializer(cuisineTopTiers, many=True)
	return Response(serializer.data)
