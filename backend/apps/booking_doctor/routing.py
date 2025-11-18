from django.urls import path

from apps.booking_doctor.consumer import BookingDoctorConsumer

websocket_urlpatterns = [
    path('', BookingDoctorConsumer.as_asgi()),
]