from django.db import models

# Create your models here.

DISTRICTS = [
    ('Charlottenburg','Charlottenburg'),
    ('Friedrichshain','Friedrichshain'),
    ('Hellersdorf','Hellersdorf'),
    ('Hohenschoenhausen','Hohenschoenhausen'),
    ('Kreuzberg','Kreuzberg'),
    ('Koepenick','Koepenick'),
    ('Lichtenberg','Lichtenberg'),
    ('Marzahn','Marzahn'),
    ('Mitte','Mitte'),
    ('Moabit','Moabit'),
    ('Neukoelln','Neukoelln'),
    ('Pankow','Pankow'),
    ('Prenzlauer Berg','Prenzlauer Berg'),
    ('Reinickendorf', 'Reinickendorf'),
    ('Schoeneberg','Schoeneberg'),
    ('Spandau','Spandau'),
    ('Steglitz','Steglitz'),
    ('Tempelhof','Tempelhof'),
    ('Tiergarten','Tiergarten'),
    ('Treptow','Treptow'),
    ('Wedding','Wedding'),
    ('Weißensee','Weißensee'),
    ('Wilmersdorf','Wilmersdorf'),
    ('Zehlendorf','Zehlendorf'),
]

MEAL_TIME = [
    ('Breakfast','Breakfast'),
    ('Brunch','Brunch'),
    ('Lunch','Lunch'),
    ('Snack','Snack'),
    ('Coffee','Coffee'),
    ('Dinner','Dinner'),
    ('Bar','Bar'),
]

CUISINE_TOPTIER = [
    ('European','European'),
    ('Asian','Asian'),
    ('South-American','South-American'),
    ('North-American','North-American'),
    ('African','African'),
    ('Oceania','Oceania'),

]

CUISINE = [
    ('German','German'),
    ('Vietnamese','Vietnamese'),
    ('Chinese','Chinese'),
    ('Thai','Thai'),
    ('Mexican','Mexican'),
    ('Italien','Italien'),
    ('French','French'),
    ('Hawaiien','Hawaiien'),
    ('Russian','Russian'),
    ('Polish','Polish'),
    ('Greek','Greek'),
    ('French','French'),
    ('Spanish','Spanish'),
    ('Taiwanese','Taiwanese'),
    ('Chilenian','Chilenian'),
    ('Columbian','Columbian'),
    ('American','American'),
    ('Turkish','Turkish'),
    ('Syrian','Syrian'),
    ('Austrian','Austrian'),
    ('Japanese','Japanese'),
]

SPECIALS = [
    ('Outdoor Seating','Outdoor Seating'),
    ('Vegetarian Options','Vegetarian Options'),
    ('Vegan Options','Vegan Options'),
]

class Restaurant(models.Model):
    name = models.CharField(max_length=60)
    district = models.CharField(max_length=60, choices=DISTRICTS)

    cuisineTopTier = models.CharField(max_length=60, choices=CUISINE_TOPTIER)
    cuisine = models.CharField(max_length=60, choices=CUISINE)

    mealTime1 = models.CharField(max_length=60, choices=MEAL_TIME)
    mealTime2 = models.CharField(max_length=60, choices=MEAL_TIME, blank=True, default='')
    mealTime3 = models.CharField(max_length=60, choices=MEAL_TIME, blank=True, default='')
    mealTime4 = models.CharField(max_length=60, choices=MEAL_TIME, blank=True, default='')
    mealTime5 = models.CharField(max_length=60, choices=MEAL_TIME, blank=True, default='')
    mealTime6 = models.CharField(max_length=60, choices=MEAL_TIME, blank=True, default='')
    mealTime7 = models.CharField(max_length=60, choices=MEAL_TIME, blank=True, default='')

    special1 = models.CharField(max_length=60, choices=SPECIALS, blank=True, default='')
    special2 = models.CharField(max_length=60, choices=SPECIALS, blank=True, default='')
    special3 = models.CharField(max_length=60, choices=SPECIALS, blank=True, default='')

    mVLink = models.CharField(max_length=60, default='', blank=True)
    homepage = models.CharField(max_length=60, default='', blank=True)
    googleMapsLink = models.CharField(max_length=600, default='', blank=True)

    def __str__(self):
        return self.name
