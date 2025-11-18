from django.urls import path

from apps.patient_card.consumer import PatientCardConsumer

websocket_urlpatterns = [
    path('', PatientCardConsumer.as_asgi()),
]