from rest_framework import serializers
from general.models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    
	class Meta:
		model = Restaurant
		fields ='__all__'