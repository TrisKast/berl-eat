from django.test import TestCase
from general.models import District, Kiez, Mealtime, Special, CuisineTopTier, Cuisine, Special, Restaurant

class TestHelperModelSetUp(TestCase):

    def setUp(self):
        self.kreuzberg = District.objects.create(name="Kreuzberg")
        self.neukoelln = District.objects.create(name="Neukölln")
        self.bergmannkiez = Kiez.objects.create(name='Bergmannkiez', district=self.kreuzberg)
        self.reuterkiez = Kiez.objects.create(name='Reuterkiez', district=self.neukoelln)
        self.dinnertime = Mealtime.objects.create(name='Dinner')
        self.lunchtime = Mealtime.objects.create(name='Lunch')
        self.asianCuisine = CuisineTopTier.objects.create(name='Asian')
        self.vietnameseCuisine = Cuisine.objects.create(name='Vietnamese', cuisineTopTier=self.asianCuisine)
        self.veganDishes = Special.objects.create(name='Happy Vegans')

        self.conTho = Restaurant.objects.create(name="ConTho",
                                                district=self.neukoelln,
                                                kiez=self.reuterkiez
                                                )
        self.conTho.save()
        self.conTho.cuisineTopTier.set([self.asianCuisine])
        self.conTho.cuisine.set([self.vietnameseCuisine])
        self.conTho.mealtimes.set([self.dinnertime, self.lunchtime])
        self.conTho.specials.set([self.veganDishes])

    def test_district_setup(self):
        self.assertEqual(self.kreuzberg.name, 'Kreuzberg')

    def test_kiez_setup(self):
        self.assertEqual(self.bergmannkiez.district, self.kreuzberg)

    def test_mealtime_setup(self):
         self.assertEqual(self.dinnertime.name, 'Dinner')

    def test_cuisineTopTier_setup(self):
        self.assertEqual(self.asianCuisine.name, 'Asian')

    def test_cuisine_setup(self):
        self.assertEqual(self.vietnameseCuisine.cuisineTopTier, self.asianCuisine)

    def test_restaurant_setup(self):
        self.assertEqual(self.conTh.name, 'ConTho')
