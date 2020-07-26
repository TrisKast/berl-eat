from rest_framework import serializers
from general.models import Restaurant, District, Kiez, Mealtime, Special, CuisineTopTier, Cuisine

class RestaurantSerializer(serializers.ModelSerializer):

	class Meta:
		model = Restaurant
		fields ='__all__'

class DistrictSerializer(serializers.ModelSerializer):

	class Meta:
		model = District
		fields ='__all__'

class KiezSerializer(serializers.ModelSerializer):

	class Meta:
		model = Kiez
		fields ='__all__'

class MealtimeSerializer(serializers.ModelSerializer):

	class Meta:
		model = Mealtime
		fields ='__all__'

class CuisineTopTierSerializer(serializers.ModelSerializer):

	class Meta:
		model =CuisineTopTier
		fields ='__all__'

class CuisineSerializer(serializers.ModelSerializer):

	class Meta:
		model = Cuisine
		fields ='__all__'

class SpecialSerializer(serializers.ModelSerializer):

	class Meta:
		model = Special
		fields ='__all__'
