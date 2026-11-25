
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0005_remove_bus_travel_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='bus',
            name='bus_image',
            field=models.ImageField(
                upload_to='bus_images/',
                blank=True,
                null=True
            ),
        ),
    ]
