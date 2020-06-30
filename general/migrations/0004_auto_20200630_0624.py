# Generated by Django 3.0.7 on 2020-06-30 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0003_restaurant_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='data',
        ),
        migrations.AddField(
            model_name='restaurant',
            name='homepage',
            field=models.CharField(blank=True, default='', max_length=60),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='mVLink',
            field=models.CharField(blank=True, default='', max_length=60),
        ),
    ]
