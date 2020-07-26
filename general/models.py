from django.db import models

class District(models.Model):
    name = models.CharField(max_length=60, primary_key=True, unique=True)

    def __str__(self):
        return self.name


class Kiez(models.Model):
    name = models.CharField(max_length=60, primary_key=True, unique=True)
    district = models.ForeignKey(District, on_delete=models.PROTECT, to_field="name", db_column="district")

    def __str__(self):
        return self.name


class Mealtime(models.Model):
    name = models.CharField(max_length=60, primary_key=True, unique=True)

    def __str__(self):
        return self.name


class CuisineTopTier(models.Model):
    name = models.CharField(max_length=60, primary_key=True, unique=True)

    def __str__(self):
        return self.name


class Cuisine(models.Model):
    name = models.CharField(max_length=60, primary_key=True, unique=True)
    cuisineTopTier = models.ForeignKey(CuisineTopTier, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Special(models.Model):
    name = models.CharField(max_length=60, primary_key=True, unique=True)

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    name = models.CharField(max_length=60, unique=True)

    district = models.ForeignKey(District, on_delete=models.PROTECT)
    kiez = models.ForeignKey(Kiez, on_delete=models.PROTECT)

    cuisineTopTier = models.ManyToManyField(CuisineTopTier)
    cuisine = models.ManyToManyField(Cuisine)
    mealtimes = models.ManyToManyField(Mealtime)
    specials = models.ManyToManyField(Special, blank=True, null=True)

    review = models.TextField(blank=True, null=True)
    mVLink = models.CharField(max_length=60, blank=True, null=True)
    homepage = models.CharField(max_length=60, blank=True, null=True)
    googleMapsLink = models.CharField(max_length=600, blank=True, null=True)
    tripadvisor = models.CharField(max_length=600, blank=True, null=True)
    facebook = models.CharField(max_length=600, blank=True, null=True)

    def __str__(self):
        return self.name
