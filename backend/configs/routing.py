from django.urls import path

from channels.routing import URLRouter

from apps.diagnostics.routing import websocket_urlpatterns as diagnostics_routes

websocket_urlpatterns = [
    path('api/diagnostics/', URLRouter(diagnostics_routes)),
]