# Generated by Django 3.0.7 on 2020-07-07 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0007_restaurant_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='kiez',
            field=models.CharField(blank=True, choices=[('Nollendorfkiez', 'Nollendorfkiez')], default='', max_length=60),
        ),
    ]
