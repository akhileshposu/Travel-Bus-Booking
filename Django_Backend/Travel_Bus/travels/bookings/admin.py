from django.contrib import admin
from .models import Bus, Seat, Booking


class BusAdmin(admin.ModelAdmin):
    list_display = ('bus_name', 'number', 'origin', 'destination', 'start_time', 'reach_time', 'no_of_seats', 'price')

class SeatAdmin(admin.ModelAdmin):
    list_display = ('seat_number', 'bus', 'is_booked')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'bus',
        'seat',
        'get_origin',
        'get_price'
    ]

    def get_origin(self, obj):
        return obj.bus.origin

    def get_price(self, obj):
        return obj.bus.price

    get_origin.short_description = 'Origin'
    get_price.short_description = 'Price'

