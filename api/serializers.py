from rest_framework import serializers
from general.models import Restaurant, District

class RestaurantSerializer(serializers.ModelSerializer):

	class Meta:
		model = Restaurant
		fields ='__all__'

class DistrictSerializer(serializers.ModelSerializer):

	class Meta:
		model = District
		fields ='__all__'
