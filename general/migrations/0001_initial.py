# Generated by Django 3.0.7 on 2020-08-07 20:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cuisine',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CuisineTopTier',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Kiez',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False, unique=True)),
                ('district', models.ForeignKey(db_column='district', on_delete=django.db.models.deletion.PROTECT, to='general.District')),
            ],
        ),
        migrations.CreateModel(
            name='Mealtime',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Special',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
                ('review', models.TextField(blank=True, null=True)),
                ('homepage', models.CharField(blank=True, max_length=60, null=True)),
                ('mVLink', models.CharField(blank=True, max_length=60, null=True)),
                ('googleMapsLink', models.CharField(blank=True, max_length=600, null=True)),
                ('tripadvisorLink', models.CharField(blank=True, max_length=600, null=True)),
                ('facebookLink', models.CharField(blank=True, max_length=600, null=True)),
                ('instagramLink', models.CharField(blank=True, max_length=600, null=True)),
                ('cuisine', models.ManyToManyField(to='general.Cuisine')),
                ('cuisineTopTier', models.ManyToManyField(to='general.CuisineTopTier')),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='general.District')),
                ('kiez', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='general.Kiez')),
                ('mealtimes', models.ManyToManyField(to='general.Mealtime')),
                ('specials', models.ManyToManyField(blank=True, null=True, to='general.Special')),
            ],
        ),
        migrations.AddField(
            model_name='cuisine',
            name='cuisineTopTier',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='general.CuisineTopTier'),
        ),
    ]
