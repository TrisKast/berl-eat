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

KIEZ = [
    ('Nollendorfkiez','Nollendorfkiez'),
    ('Reuterkiez','Reuterkiez'),
    ('Kungerkiez','Kungerkiez'),
    ('Wrangelkiez','Wrangelkiez'),
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
    ('Fusion','Fusion'),
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
    ('Amazing Outdoor Seating','Amazing Outdoor Seating'),
    ('Extraordinary Flair','Extraordinary Flair'),
    ('Happy Vegans','Happy Vegans'),
    ('Fine Dining','Fine Dining'),
]

class District(models.Model):
    name = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class Restaurant(models.Model):
    name = models.CharField(max_length=60)
    district = models.ForeignKey(District, on_delete=models.PROTECT)
    #district = models.CharField(max_length=60, choices=DISTRICTS)
    kiez = models.CharField(max_length=60, choices=KIEZ, blank=True, default='')

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

    review = models.TextField(default='', blank=True)
    mVLink = models.CharField(max_length=60, default='', blank=True)
    homepage = models.CharField(max_length=60, default='', blank=True)
    googleMapsLink = models.CharField(max_length=600, default='', blank=True)

    def __str__(self):
        return self.name
