from django.urls import path

from channels.routing import URLRouter

from apps.booking_diagnostic.routing import websocket_urlpatterns as booking_diagnostic_routes
from apps.booking_doctor.routing import websocket_urlpatterns as booking_doctor_routing
from apps.diagnostics.routing import websocket_urlpatterns as diagnostics_routes
from apps.patient_card.routing import websocket_urlpatterns as patient_card_routes

websocket_urlpatterns = [
    path('api/diagnostics/', URLRouter(diagnostics_routes)),
    path('api/booking_diagnostic/', URLRouter(booking_diagnostic_routes)),
    path('api/booking_doctor/', URLRouter(booking_doctor_routing)),
    path('api/patient_card/', URLRouter(patient_card_routes)),
]