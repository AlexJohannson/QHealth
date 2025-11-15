from django.urls import path

from apps.booking_diagnostic.consumer import BookingConsumer

websocket_urlpatterns = [
    path('', BookingConsumer.as_asgi()),
]