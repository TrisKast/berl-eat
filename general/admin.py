from django.contrib import admin
from .models import Restaurant, District, Kiez, Mealtime, Special, Cuisine, CuisineTopTier

# Register your models here.

admin.site.register(Restaurant)
admin.site.register(District)
admin.site.register(Kiez)
admin.site.register(Mealtime)
admin.site.register(Special)
admin.site.register(CuisineTopTier)
admin.site.register(Cuisine)
