from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RestaurantSerializer, DistrictSerializer
from general.models import Restaurant, District

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Restaurant List':'/restaurant_list/',
		'Restaurant Detail View':'/restaurant_detail/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def restaurantList(request):
	restaurants = Restaurant.objects.all().order_by('-id')
	serializer = RestaurantSerializer(restaurants, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def districtList(request):
	districts = District.objects.all().order_by('-id')
	serializer = DistrictSerializer(districts, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def restaurantDetail(request, pk):
	restaurants = Restaurant.objects.get(id=pk)
	serializer = RestaurantSerializer(restaurants, many=False)
	return Response(serializer.data)
